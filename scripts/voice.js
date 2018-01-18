import Tone from 'tone';

class Voice {
  constructor(name, range, timbre) {
    this.range = range;
    this.timbre = timbre;
    this.name = name;
  }
}

export default Voice;
