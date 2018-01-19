import Tone from 'tone';

class Voice {
  constructor(part, range, instrument) {
    this.state = { playing: false }
    this.range = range;
    this.instrument = new instrument();
    this.instrument.toMaster();
    this.connectVoice(this.range);
    this.setPart(part);
  }

  connectVoice(range) {
    $(`#${range}-volume`).on('input', this.adjustVolume.bind(this));
  }

  adjustVolume(e) {
    this.instrument.volume.value = parseFloat(e.target.value);
    console.log(this.volume);
  }

  setPart(part) {
    const pattern = new Tone.Pattern(function(time, note){
    this.instrument.triggerAttackRelease(note, 0.25);
  }.bind(this), part);
    pattern.start(0)
  }

  instrument() {
    this.instrument;
  }
}

export default Voice;
