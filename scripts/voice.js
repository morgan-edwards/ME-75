import Tone from 'tone';
import { addVoice } from './interface';

class Voice {
  constructor(range) {
    this.range = range;
    addVoice(range);
  }

  
}

export default Voice;
