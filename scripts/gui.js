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
const chorusLevels = { chorusFreq: 0, chorusDel: 0, chorusDep: 0 };
const delayLevels = { delayTime: 0, delayFeedback: 0, delayWet: 0};
const reverbLevels = { roomSize: 0, revWet: 0 };
const distLevels = { dist: 0, distWet: 0 };

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
//Sets defaults
distortion.wet.value = distLevels.distWet;
reverb.wet.value = reverbLevels.revWet;

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

//Control building helper functions
const colorize = (component) => {
  component.colorize("fill", "#ffffff");
  component.colorize("accent", "#ff0037");
  component.colorize("dark", "#ffaa00");
  component.colorize("light", "#88ffa8");
  component.colorize("mediumLight", "#ffaa00");
  component.colorize("mediumDark", "#00ffa6");
};

const createDial = (min, max, val, id) => {
  const dial = new Nexus.Dial(id, {
    'size': [50, 50],
    'min': min,
    'max': max,
    'value': val,
  });
  colorize(dial);
  return dial;
};

const activateDial = (dial, state, targetObj, targetKey, id) => {
  dial.on('change', (v) => {
    updateState(state, id, v);
    targetObj[targetKey] = state[id];
  });
};

const generateDial = dialObj => {
  const dial = createDial(dialObj.min,dialObj.max,dialObj.val,dialObj.id);
  activateDial(dial, dialObj.state, dialObj.target, dialObj.key, dialObj.id);
};
// Builds and styles voice 1

//Oscilloscope
const oscilloscope = new Nexus.Oscilloscope('#oscilloscope', {
  'size': [600, 150]
});
oscilloscope.connect(Tone.Master);
oscilloscope.colorize("fill", "#000000");
oscilloscope.colorize("accent", "#ffffff");

//Wavefrom selector control1.waveForm.select(0);
const waveformSelector = new Nexus.RadioButton('waveform', {
  'active': 0
});
colorize(waveformSelector);
waveformSelector.on('change', (v) => {
  updateState(playState, 'wave', waveTypes[v]);
  synth.oscillator.type = playState.wave;
});

// Volume
generateDial({
  min: volumeLevels.low,
  max: volumeLevels.high,
  val: volumeLevels.volume,
  id: 'volume',
  state: volumeLevels,
  target: synth.volume,
  key: 'value',
});

// // EQ
generateDial({
  min: volumeLevels.low,
  max: volumeLevels.high,
  val: eqLevels.lowLevelEq,
  id: 'lowLevelEq',
  state: eqLevels,
  target: eq3.low,
  key: 'value',
});
generateDial({
  min: volumeLevels.low,
  max: volumeLevels.high,
  val: eqLevels.midLevelEq,
  id: 'midLevelEq',
  state: eqLevels,
  target: eq3.mid,
  key: 'value',
});
generateDial({
  min: volumeLevels.low,
  max: volumeLevels.high,
  val: eqLevels.highLevelEq,
  id: 'highLevelEq',
  state: eqLevels,
  target: eq3.high,
  key: 'value',
});

// //Compressor
generateDial({
  min: -100,
  max: 0,
  val: compressorLevels.threshold,
  id: 'threshold',
  state: compressorLevels,
  target: compressor.threshold,
  key: 'value',
});
generateDial({
  min: 1,
  max: 20,
  val: compressorLevels.ratio,
  id: 'ratio',
  state: compressorLevels,
  target: compressor.ratio,
  key: 'value',
});

// //Filters
generateDial({
  min: 27,
  max: 4200,
  val: filterLevels.lowpass,
  id: 'lowpass',
  state: filterLevels,
  target: lowpassFilter.frequency,
  key: 'value',
});
generateDial({
  min: 27,
  max: 4200,
  val: filterLevels.highpass,
  id: 'highpass',
  state: filterLevels,
  target: highpassFilter.frequency,
  key: 'value',
});

// //Attack-Release
generateDial({
  min: 0.01,
  max: 5,
  val: synthSettings.attack,
  id: 'attack',
  state: synthSettings,
  target: synth.envelope,
  key: 'attack',
});
generateDial({
  min: 0.01,
  max: 5,
  val: synthSettings.release,
  id: 'release',
  state: synthSettings,
  target: synth.envelope,
  key: 'release',
});

// //Chorus
generateDial({
  min: 0,
  max: 3,
  val: chorusLevels.chorusFreq,
  id: 'chorusFreq',
  state: chorusLevels,
  target: chorus.frequency,
  key: 'value',
});
generateDial({
  min: 0,
  max: 3,
  val: chorusLevels.chorusDel,
  id: 'chorusDel',
  state: chorusLevels,
  target: chorus,
  key: 'delayTime',
});
generateDial({
  min: 0,
  max: 3,
  val: chorusLevels.chorusDep,
  id: 'chorusDep',
  state: chorusLevels,
  target: chorus,
  key: 'depth',
});

// //Delay
generateDial({
  min: 0,
  max: 1,
  val: delayLevels.delayTime,
  id: 'delayTime',
  state: delayLevels,
  target: delay.delayTime,
  key: 'value',
});
generateDial({
  min: 0,
  max: 1,
  val: delayLevels.delayFeedback,
  id: 'delayFeedback',
  state: delayLevels,
  target: delay.feedback,
  key: 'value',
});
generateDial({
  min: 0,
  max: 1,
  val: delayLevels.delayWet,
  id: 'delayWet',
  state: delayLevels,
  target: delay.wet,
  key: 'value',
});

// //Reverb
generateDial({
  min: 0,
  max: 1,
  val: reverbLevels.roomSize,
  id: 'roomSize',
  state: reverbLevels,
  target: reverb.roomSize,
  key: 'value',
});
generateDial({
  min: 0,
  max: 1,
  val: reverbLevels.revWet,
  id: 'revWet',
  state: reverbLevels,
  target: reverb.wet,
  key: 'value',
});

// Distortion
generateDial({
  min: 0,
  max: 5,
  val: distLevels.dist,
  id: 'dist',
  state: distLevels,
  target: distortion,
  key: 'distortion',
});
generateDial({
  min: 0,
  max: 1,
  val: distLevels.distWet,
  id: 'distWet',
  state: distLevels,
  target: distortion.wet,
  key: 'value',
});
