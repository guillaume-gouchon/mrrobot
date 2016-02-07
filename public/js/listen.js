var recognizer, recorder, callbackManager, audioContext, outputContainer;
var recorderReady = recognizerReady = false;

// This is the list of words that need to be added to the recognizer
var wordList = [];

// This grammar recognizes digits
var grammarDigits = {numStates: 1, start: 0, end: 0, transitions: []};

var grammars;

$.get('/words.dic', function (response) {
  var lines = response.split('\n')
  for (var i in lines) {
    var line = lines[i];
    wordList.push(line.split('\t'));
  }

  for (var i in wordList) {
    var word = wordList[i][0];
    grammarDigits.transitions.push({
      from: 0,
      to: 0,
      word: word
    });
  }

  grammars = [{title: "Digits", g: grammarDigits}];
});

var grammarIds = [];

function postRecognizerJob(message, callback) {
  var msg = message || {};
  if (callbackManager) msg.callbackId = callbackManager.add(callback);
  if (recognizer) recognizer.postMessage(msg);
};

function spawnWorker(workerURL, onReady) {
  recognizer = new Worker(workerURL);
  recognizer.onmessage = function(event) {
    onReady(recognizer);
  };
  recognizer.postMessage('');
};

var isSpeaking = false;

// To display the hypothesis sent by the recognizer
function updateHyp(hyp) {
  console.log(hyp);
  if (!isSpeaking) {
    if (hyp.indexOf('TELL A JOKE') >= 0 || hyp.indexOf('RACONTE UNE BLAGUE') >= 0) {
      isSpeaking = true;
      recorder.stop();
      $.post('/api/joke', function () {
        isSpeaking = false;
        recorder.start();
      });
    } else if (hyp.indexOf('IT WAS HUGE') >= 0 || hyp.indexOf('ELLE EST éNORME') >= 0 || hyp.indexOf('IL EST éNORME') >= 0) {
      isSpeaking = true;
      recorder.stop();
      $.post('/api/fun', function () {
        isSpeaking = false;
        recorder.start();
      });
    }
  }
};

// Callback function once the user authorises access to the microphone
// in it, we instanciate the recorder
function startUserMedia(stream) {
  var input = audioContext.createMediaStreamSource(stream);
  window.firefox_audio_hack = input; 
  var audioRecorderConfig = {errorCallback: function(x) {console.error("Error from recorder: " + x);}};
  recorder = new AudioRecorder(input, audioRecorderConfig);
  // If a recognizer is ready, we pass it to the recorder
  if (recognizer) recorder.consumers = [recognizer];
  recorderReady = true;
  console.log("Audio recorder ready");
};

// This starts recording. We first need to get the id of the grammar to use
var startRecording = function() {
  if (recorder) recorder.start(grammarIds[0].id);
};

// Called once the recognizer is ready
// We then add the grammars to the input select tag and update the UI
var recognizerReady = function() {
  recognizerReady = true;
  console.log("Recognizer ready");
  startRecording()
};

// This adds a grammar from the grammars array
// We add them one by one and call it again as
// a callback.
// Once we are done adding all grammars, we can call
// recognizerReady()
var feedGrammar = function(g, index, id) {
  if (id && (grammarIds.length > 0)) grammarIds[0].id = id.id;
  if (index < g.length) {
    grammarIds.unshift({title: g[index].title})
    postRecognizerJob({command: 'addGrammar', data: g[index].g}, function (id) {
      feedGrammar(grammars, index + 1, {id:id});
    });
  } else {
    recognizerReady();
  }
};

// This adds words to the recognizer. When it calls back, we add grammars
var feedWords = function(words) {
  console.log('feed words', words);
  postRecognizerJob({command: 'addWords', data: words}, function() {
    feedGrammar(grammars, 0);
  });
};

// This initializes the recognizer. When it calls back, we add words
var initRecognizer = function() {
    // You can pass parameters to the recognizer, such as : {command: 'initialize', data: [["-hmm", "my_model"], ["-fwdflat", "no"]]}
    postRecognizerJob({command: 'initialize'}, function() {
      if (recorder) {
        recorder.consumers = [recognizer];
      }

      feedWords(wordList);
    });
  };

// When the page is loaded, we spawn a new recognizer worker and call getUserMedia to
// request access to the microphone
window.onload = function() {
  console.log("Initializing web audio and speech recognizer, waiting for approval to access the microphone");
  callbackManager = new CallbackManager();
  spawnWorker("js/recognizer.js", function(worker) {
    // This is the onmessage function, once the worker is fully loaded
    worker.onmessage = function(e) {
      // This is the case when we have a callback id to be called
      if (e.data.hasOwnProperty('id')) {
        var clb = callbackManager.get(e.data['id']);
        var data = {};
        if ( e.data.hasOwnProperty('data')) data = e.data.data;
        if(clb) clb(data);
      }
      // This is a case when the recognizer has a new hypothesis
      if (e.data.hasOwnProperty('hyp')) {
        console.log(e.data)
        var newHyp = e.data.hyp;
        if (e.data.hasOwnProperty('final') &&  e.data.final) newHyp = "Final: " + newHyp;
        updateHyp(newHyp);
      }
      // This is the case when we have an error
      if (e.data.hasOwnProperty('status') && (e.data.status == "error")) {
        console.error("Error in " + e.data.command + " with code " + e.data.code);
      }
    };

    initRecognizer();
  });

  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    window.URL = window.URL || window.webkitURL;
    audioContext = new AudioContext();
  } catch (e) {
    console.error("Error initializing Web Audio browser");
    $('body').prepend('Error web audio browser')
  }

  if (navigator.getUserMedia) {
    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
      console.log("No live audio input in this browser");
    $('body').prepend('Error input'  +e)
    });
  } else {
    $('body').prepend('no web audiosupport')

    console.log("No web audio support in this browser");
  }
};

