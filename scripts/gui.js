import Tone from 'tone';
import * as Transcribe from './transcribers';

//Sets Nexus context to Tone context
Nexus.context = Tone.context;

//Default audio levels
const defaultLevels = {
  volume: -10,
  high: 10,
  low: -30,
}
// Callbacks
const updatePlayState = (key, val) => {
  playState[key] = val;
};

//State objects
const playState = {
  playing: false,
  wave: 'sine',
  volume: defaultLevels.volume,
  lowLevelEq: defaultLevels.volume,
  midLevelEq: defaultLevels.volume,
  highLevelEq: defaultLevels.volume,
};
const waveTypes = { 0: 'sine', 1: 'square', 2: 'triangle', 3: 'sawtooth'};
const patterns = {};

//Set up rack components
const eq3 = new Tone.EQ3(defaultLevels.volume, defaultLevels.volume, defaultLevels.volume);
eq3.toMaster();

//Test Code
var synth = new Tone.AMSynth();
synth.oscillator.type = playState.wave;
synth.volume.value = playState.volume;

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
  updatePlayState('playing', v);
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
  updatePlayState('wave', waveTypes[v]);
  synth.oscillator.type = playState.wave;
});

// Volume

control1.volume.max = defaultLevels.high
control1.volume.min = defaultLevels.low;
control1.volume.value = defaultLevels.volume;

control1.volume.on('change', (v) => {
  updatePlayState('volume', v);
  synth.volume.value = playState.volume;
});

// EQ
control1.lowLevelEq.max = defaultLevels.high
control1.lowLevelEq.min = defaultLevels.low;
control1.lowLevelEq.value = defaultLevels.volume;
control1.lowLevelEq.on('change', (v) => {
  updatePlayState('lowLevelEq', v);
  eq3.low.value = playState.lowLevelEq;
});

control1.midLevelEq.max = defaultLevels.high
control1.midLevelEq.min = defaultLevels.low;
control1.midLevelEq.value = defaultLevels.volume;
control1.midLevelEq.on('change', (v) => {
  updatePlayState('midLevelEq', v);
  eq3.mid.value = playState.midLevelEq;
});

control1.highLevelEq.max = defaultLevels.high
control1.highLevelEq.min = defaultLevels.low;
control1.highLevelEq.value = defaultLevels.volume;
control1.highLevelEq.on('change', (v) => {
  updatePlayState('highLevelEq', v);
  eq3.high.value = playState.highLevelEq;
});
