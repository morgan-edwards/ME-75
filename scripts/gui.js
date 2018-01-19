import Tone from 'tone';
import * as Transcribe from './transcribers';

//Sets Nexus context to Tone context
Nexus.context = Tone.context;

//State
const patterns = {};

const waveTypes = {
   0: 'sine',
   1: 'square',
   2: 'triangle',
   3: 'sawtooth'
 };

const volumeLevels = {
  volume: -10,
  high: 10,
  low: -30,
};

const compressorLevels = {
  threshold: -24,
  ratio: 12,
};


const eqLevels = {
  lowLevelEq: volumeLevels.volume,
  midLevelEq: volumeLevels.volume,
  highLevelEq: volumeLevels.volume,
};

const playState = {
  playing: false,
  wave: 'sine',
};


// Callbacks
const updateState = (type, key, val) => {
  type[key] = val;
};



//Set up rack components
const compressor = new Tone.Compressor(volumeLevels.volume, volumeLevels.volume, volumeLevels.volume);
compressor.toMaster();
const eq3 = new Tone.EQ3(volumeLevels.volume, volumeLevels.volume, volumeLevels.volume);
eq3.connect(compressor);
const lowpassFilter = new Tone.Filter(350, 'lowpass');
lowpassFilter.connect(eq3);
const highpassFilter = new Tone.Filter(200, 'highpass');
highpassFilter.connect(lowpassFilter);

//Test Code
const synth = new Tone.AMSynth();
synth.oscillator.type = playState.wave;
synth.volume.value = volumeLevels.volume;

synth.connect(eq3);
const pattern = new Tone.Pattern(function(time, note){
  synth.triggerAttackRelease(note, 0.25);
}, ["C4", "E4", "G4", "A4"]);

pattern.start(0);


//Transport callbacks
const updateTransport = () => {
  if (playState.playing) {
    Tone.Transport.start();
    console.log("Starting transport");
  } else {
    Tone.Transport.stop();
    console.log("Stopping transport")
  }
};

//Transport GUI
const play = new Nexus.Button('#play-btn', {
  'mode': 'toggle',
});
play.colorize("fill", "#ffffff");
play.colorize("accent", "#ff0037");
play.on('change', (v) => {
  updateState(playState, 'playing', v);
  updateTransport();
});

// Builds and styles voice 1 interface

const control1 = new Nexus.Rack("voice-1");
control1.colorize("fill", "#ffffff");
control1.colorize("accent", "#ff0037");
control1.colorize("dark", "#ffaa00");
control1.colorize("light", "#88ffa8");
control1.colorize("mediumLight", "#ffaa00");
control1.colorize("mediumDark", "#00ffa6");

// Hooks up the controls to the voice

//Oscilloscope
control1.oscilloscope.connect(synth);
control1.waveForm.select(0);
control1.waveForm.on('change', (v) => {
  updateState(playState, 'wave', waveTypes[v]);
  synth.oscillator.type = playState.wave;
});

// Volume

control1.volume.max = volumeLevels.high;
control1.volume.min = volumeLevels.low;
control1.volume.value = volumeLevels.volume;

control1.volume.on('change', (v) => {
  updateState(volumeLevels, 'volume', v);
  synth.volume.value = volumeLevels.volume;
});

// EQ
control1.lowLevelEq.max = volumeLevels.high;
control1.lowLevelEq.min = volumeLevels.low;
control1.lowLevelEq.value = eqLevels.lowLevelEq;
control1.lowLevelEq.on('change', (v) => {
  updateState(eqLevels, 'lowLevelEq', v);
  eq3.low.value = eqLevels.lowLevelEq;
});

control1.midLevelEq.max = volumeLevels.high;
control1.midLevelEq.min = volumeLevels.low;
control1.midLevelEq.value = eqLevels.midLevelEq;
control1.midLevelEq.on('change', (v) => {
  updateState(eqLevels, 'midLevelEq', v);
  eq3.mid.value = eqLevels.midLevelEq;
});

control1.highLevelEq.max = volumeLevels.high;
control1.highLevelEq.min = volumeLevels.low;
control1.highLevelEq.value = eqLevels.highLevelEq;
control1.highLevelEq.on('change', (v) => {
  updateState(eqLevels, 'highLevelEq', v);
  eq3.high.value = eqLevels.highLevelEq;
});


//Compressor
control1.threshold.max = 0;
control1.threshold.min = -100;
control1.threshold.value = compressorLevels.threshold;
control1.threshold.on('change', (v) => {
  updateState(compressorLevels, 'threshold', v);
  compressor.threshold.value = compressorLevels.threshold;
});

control1.ratio.max = 20;
control1.ratio.min = 1;
control1.ratio.value = compressorLevels.ratio;
control1.ratio.on('change', (v) => {
  updateState(compressorLevels, 'ratio', v);
  compressor.ratio.value = compressorLevels.ratio;
});

// //Filters
// control1.lowpass.on('change', (v) => {
//   updateState('filterLevels', 'lowpass', v);
//   compressor.lowpass.value = filterLevels.lowpass;
// });
