import { synth } from './gui';

const currentState = { key: null, octave: 4, active: false };
const playKey = (pitch, octave, e) => {
  synth.triggerAttack(`${pitch}${octave}`);
  currentState.key = e.key;
};

const synthContainer = document.getElementById('synth');
synthContainer.addEventListener('mouseenter', () => {
  currentState.active = true;
});
synthContainer.addEventListener('mouseleave', () => {
  currentState.active = false;
});

document.addEventListener('keydown',(e) =>{
  if (currentState.active) {
    switch (e.key) {
      case 's':
      playKey('C', currentState.octave, e);
      break;
      case 'e':
      playKey('C#', currentState.octave, e);
      break;
      case 'd':
      playKey('D', currentState.octave, e);
      break;
      case 'r':
      playKey('D#', currentState.octave, e);
      break;
      case 'f':
      playKey('E', currentState.octave, e);
      break;
      case 'g':
      playKey('F', currentState.octave, e);
      break;
      case 'y':
      playKey('F#', currentState.octave, e);
      break;
      case 'h':
      playKey('G', currentState.octave, e);
      break;
      case 'u':
      playKey('G#', currentState.octave, e);
      break;
      case 'j':
      playKey('A', currentState.octave, e);
      break;
      case 'i':
      playKey('A#', currentState.octave, e);
      break;
      case 'k':
      playKey('B', currentState.octave, e);
      break;
      case 'l':
      playKey('C', (currentState.octave + 1), e);
      break;
      default:
      return null;
    }
  }
});

document.addEventListener('keyup', e => {
  if (currentState.key === e.key) {
    synth.triggerRelease();
  }
});
