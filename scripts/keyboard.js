import { synth } from './gui';

export const keyboardState = { key: null, octave: 4, active: false };
const playKey = (pitch, octave, e) => {
  synth.triggerAttack(`${pitch}${octave}`);
  keyboardState.key = e.key;
};
const raiseOctave = () => {
  if (keyboardState.octave < 8) {
    keyboardState.octave = keyboardState.octave + 1;
  }
};

const lowerOctave = () => {
  if (keyboardState.octave > 0) {
    keyboardState.octave = keyboardState.octave - 1;
  }
};

const synthContainer = document.getElementById('synth');
synthContainer.addEventListener('mouseenter', () => {
  keyboardState.active = true;
});
synthContainer.addEventListener('mouseleave', () => {
  keyboardState.active = false;
});

document.addEventListener('keydown',(e) =>{
  if (keyboardState.active) {
    switch (e.key) {
      case 's':
        playKey('C', keyboardState.octave, e);
        break;
      case 'e':
        playKey('C#', keyboardState.octave, e);
        break;
      case 'd':
        playKey('D', keyboardState.octave, e);
        break;
      case 'r':
        playKey('D#', keyboardState.octave, e);
        break;
      case 'f':
        playKey('E', keyboardState.octave, e);
        break;
      case 'g':
        playKey('F', keyboardState.octave, e);
        break;
      case 'y':
        playKey('F#', keyboardState.octave, e);
        break;
      case 'h':
        playKey('G', keyboardState.octave, e);
        break;
      case 'u':
        playKey('G#', keyboardState.octave, e);
        break;
      case 'j':
        playKey('A', keyboardState.octave, e);
        break;
      case 'i':
        playKey('A#', keyboardState.octave, e);
        break;
      case 'k':
        playKey('B', keyboardState.octave, e);
        break;
      case 'l':
        playKey('C', (keyboardState.octave + 1), e);
        break;
      case '-':
        lowerOctave();
        break;
      case '=':
        raiseOctave();
        break;
      case '+':
        raiseOctave();
        break;
      default:
      return null;
    }
  }
});

document.addEventListener('keyup', e => {
  if (keyboardState.key === e.key) {
    synth.triggerRelease();
  }
});
