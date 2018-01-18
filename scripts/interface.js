import Voice from './voice';
import Tone from 'tone';

export const voiceCounts = {
  bass: 0,
  baritone: 0,
  tenor: 0,
  alto: 0,
  soprano: 0,
};

const addVoiceButtons = []
const addBassBtn = document.getElementById('add-bass');
addVoiceButtons.push(addBassBtn);
const addBaritoneBtn = document.getElementById('add-baritone');
addVoiceButtons.push(addBaritoneBtn);
const addTenorBtn = document.getElementById('add-tenor');
addVoiceButtons.push(addTenorBtn);
const addAltoBtn = document.getElementById('add-alto');
addVoiceButtons.push(addAltoBtn);
const addSopranoBtn = document.getElementById('add-soprano');
addVoiceButtons.push(addSopranoBtn);

addVoiceButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    new Voice(e.target.value, Tone.FMSynth);
  });
});

$('#start-transport').on('click', () => {
  Tone.Transport.start();
  console.log(Tone.Transport);
});

$('#stop-transport').on('click', () => {
  Tone.Transport.stop();
  console.log("stopped transport");
});
