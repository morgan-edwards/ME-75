import { synth } from './gui';

const currentPitch = { key: null, octave: 4 };

const playKey = (pitch, octave, e) => {
  synth.triggerAttack(`${pitch}${octave}`);
  currentPitch.key = e.key;
};

document.addEventListener('keydown',(e) =>{
  switch (e.key) {
    case 's':
      playKey('C', currentPitch.octave, e);
      break;
    case 'e':
      playKey('C#', currentPitch.octave, e);
      break;
    case 'd':
      playKey('D', currentPitch.octave, e);
      break;
    case 'r':
      playKey('D#', currentPitch.octave, e);
      break;
    case 'f':
      playKey('E', currentPitch.octave, e);
      break;
    case 'g':
      playKey('F', currentPitch.octave, e);
      break;
    case 'y':
      playKey('F#', currentPitch.octave, e);
      break;
    case 'h':
      playKey('G', currentPitch.octave, e);
      break;
    case 'u':
      playKey('G#', currentPitch.octave, e);
      break;
    case 'j':
      playKey('A', currentPitch.octave, e);
      break;
    case 'i':
      playKey('A#', currentPitch.octave, e);
      break;
    case 'k':
      playKey('B', currentPitch.octave, e);
      break;
    case 'l':
      playKey('C', (currentPitch.octave + 1), e);
      break;
    default:
      return null;
  }
});

document.addEventListener('keyup', e => {
  if (currentPitch.key === e.key) {
    synth.triggerRelease();
  }
});
