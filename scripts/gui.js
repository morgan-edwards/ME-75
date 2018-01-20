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
const playState = { playing: false, wave: 'sine', };
const synthSettings ={ attack: 0.25, release: 0.25 };
const volumeLevels = { volume: -10, high: 10, low: -30, };
const compressorLevels = { threshold: -24, ratio: 12, };
const eqLevels = {
  lowLevelEq: volumeLevels.volume,
  midLevelEq: volumeLevels.volume,
  highLevelEq: volumeLevels.volume,
};
const filterLevels = { lowpass: 4200, highpass: 0, };
const chorusLevels = { freq: 0, delay: 0, depth: 0 };
const delayLevels = { time: 0, feedback: 0, wet: 0};
const reverbLevels = { roomSize: 0, wet: 0 };
const distLevels = { dist: 0, wet: 0 };

// Callbacks
const updateState = (type, key, val) => {
  type[key] = val;
};

//Set up rack components
const compressor = new Tone.Compressor(volumeLevels.volume, volumeLevels.volume, volumeLevels.volume);
const eq3 = new Tone.EQ3(volumeLevels.volume, volumeLevels.volume, volumeLevels.volume);
const lowpassFilter = new Tone.Filter(filterLevels.lowpass, 'lowpass');
const highpassFilter = new Tone.Filter(filterLevels.highpass, 'highpass');
const reverb = new Tone.JCReverb(reverbLevels.roomSize);
const chorus = new Tone.Chorus(chorusLevels.freq, chorusLevels.delay, chorusLevels.depth);
const delay = new Tone.FeedbackDelay(delayLevels.time, delayLevels.feedback);
const distortion = new Tone.Distortion(distLevels.dist);

//Synth Setup
export const synth = new Tone.AMSynth();
synth.oscillator.type = playState.wave;
synth.volume.value = volumeLevels.volume;
synth.envelope.attack = synthSettings.attack;
synth.envelope.release = synthSettings.release;
synth.chain(
  compressor,
  chorus,
  delay,
  distortion,
  reverb,
  lowpassFilter,
  highpassFilter,
  eq3,
  Tone.Master
);

// TEST AUDIO
var pattern = new Tone.Part(function(time, value){
	//the value is an object which contains both the note and the velocity
	synth.triggerAttackRelease(value.note, value.dur, time, value.velocity);
}, [{"time" : 0, "note" : "C3", "velocity": 0.9, "dur":"8n", },
    {"time" : "0:2", "note" : "G4", "velocity": 0.5, "dur":"4n", }
]).start(0);

pattern.loop = true;
pattern.start(0);


//Transport callbacks
const updateTransport = () => {
  if (playState.playing) {
    Tone.Transport.start();
  } else {
    Tone.Transport.stop();
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

//Filters
control1.lowpass.max = 4200;
control1.lowpass.min = 27;
control1.lowpass.value = filterLevels.lowpass;
control1.lowpass.on('change', (v) => {
  updateState(filterLevels, 'lowpass', v);
  lowpassFilter.frequency.value = filterLevels.lowpass;
});

control1.highpass.max = 4200;
control1.highpass.min = 27;
control1.highpass.value = filterLevels.highpass;
control1.highpass.on('change', (v) => {
  updateState(filterLevels, 'highpass', v);
  highpassFilter.frequency.value = filterLevels.highpass;
});

//Attack-Release
control1.attack.max = 5;
control1.attack.min = 0.01;
control1.attack.value = synthSettings.attack;
control1.attack.on('change', (v) => {
  updateState(synthSettings, 'attack', v);
  synth.envelope.attack = synthSettings.attack;
});

control1.release.max = 5;
control1.release.min = 0.01;
control1.release.value = synthSettings.release;
control1.release.on('change', (v) => {
  updateState(synthSettings, 'release', v);
  synth.envelope.release = synthSettings.release;
});

//Chorus
control1.chorusFreq.max = 3;
control1.chorusFreq.min = 0;
control1.chorusFreq.value = chorusLevels.freq;
control1.chorusFreq.on('change', (v) => {
  updateState(chorusLevels, 'freq', v);
  chorus.frequency.value = chorusLevels.freq;
});

control1.chorusDel.max = 7;
control1.chorusDel.min = 0;
control1.chorusDel.value = chorusLevels.delay;
control1.chorusDel.on('change', (v) => {
  updateState(chorusLevels, 'delay', v);
  chorus.delayTime = chorusLevels.delay;
});

control1.chorusDep.max = 5;
control1.chorusDep.min = 0;
control1.chorusDep.value = chorusLevels.depth;
control1.chorusDep.on('change', (v) => {
  updateState(chorusLevels, 'depth', v);
  chorus.depth = chorusLevels.depth;
});

//Delay
control1.delayTime.max = 1;
control1.delayTime.min = 0;
control1.delayTime.value = delayLevels.time;
control1.delayTime.on('change', (v) => {
  updateState(delayLevels, 'time', v);
  delay.delayTime.value = delayLevels.time;
});

control1.delayFeedback.max = 1;
control1.delayFeedback.min = 0;
control1.delayFeedback.value = delayLevels.feedback;
control1.delayFeedback.on('change', (v) => {
  updateState(delayLevels, 'feedback', v);
  delay.feedback.value = delayLevels.feedback;
});

control1.delayWet.max = 1;
control1.delayWet.min = 0;
control1.delayWet.value = delayLevels.wet;
delay.wet.value = delayLevels.wet;
control1.delayWet.on('change', (v) => {
  updateState(delayLevels, 'wet', v);
  delay.wet.value = delayLevels.wet;
});

//Reverb
control1.reverb.max = 1;
control1.reverb.min = 0;
control1.reverb.value = reverbLevels.roomSize;
control1.reverb.on('change', (v) => {
  updateState(reverbLevels, 'roomSize', v);
  reverb.roomSize.value = reverbLevels.roomSize;
});

control1.revWet.max = 1;
control1.revWet.min = 0;
control1.revWet.value = reverbLevels.wet;
reverb.wet.value = reverbLevels.wet;
control1.revWet.on('change', (v) => {
  updateState(reverbLevels, 'wet', v);
  reverb.wet.value = reverbLevels.wet;
});

//Distortion
control1.dist.max = 5;
control1.dist.min = 0;
control1.dist.value = distLevels.dist;
control1.dist.on('change', (v) => {
  updateState(distLevels, 'dist', v);
  distortion.distortion = distLevels.dist;
});

control1.distWet.max = 1;
control1.distWet.min = 0;
control1.distWet.value = distLevels.wet;
distortion.wet.value = distLevels.wet;
control1.distWet.on('change', (v) => {
  updateState(distLevels, 'wet', v);
  distortion.wet.value = distLevels.wet;
});
