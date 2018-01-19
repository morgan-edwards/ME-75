import Voice from './voice';
import Tone from 'tone';
import * as Transcribe from './transcribers';

const melody = Transcribe.nameToMelody('morgan','major');
console.log(melody);

new Voice(melody, 'bass', Tone.FMSynth);

$('#start-transport').on('click', () => {
  Tone.Transport.start();
  console.log(Tone.Transport);
});

$('#stop-transport').on('click', () => {
  Tone.Transport.stop();
  console.log("stopped transport");
});
