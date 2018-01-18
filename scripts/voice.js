import Tone from 'tone';
import { voiceCounts } from './interface';

class Voice {
  constructor(range, instrument) {
    this.state = { playing: false }
    this.range = range;
    this.instrument = new instrument();
    this.index = parseInt(voiceCounts[range]) + 1;
    voiceCounts[range] = this.index;
    this.instrument.toMaster();
    this.id = `${range}${voiceCounts[range]}`;
    this.addVoice(this.range, this.id);
    this.part = this.setPart();
  }

  addVoice(range, id) {
    const voiceDiv = (`
      <div id=${id} class='voice'>
        <input
          value='-12'
          max='6'
          min='-60'
          step='0.01'
          type='range'
          id='${id}-volume' />
        <button id='${id}-delete'>Delete</button>
      </div>
    `);
    $(`#${range}`).append(voiceDiv);
    $(`#${id}-volume`).on('input', this.adjustVolume.bind(this));
    $(`#${id}-delete`).click(() => {
      $(`#${id}`).remove();
      this.instrument.disconnect();
      this.instrument.dispose();
    });
  }

  adjustVolume(e) {
    this.instrument.volume.value = parseFloat(e.target.value);
    console.log(this.volume);
  }

  setPart() {
    const part = new Tone.Part((time, note) => {
      this.instrument.triggerAttackRelease(note, "8n", time);
    }, [[0, "C#2"], ["0:2", "E#3"], ["0:3:2", "G#2"]]);
    part.start(0);
  }

  instrument() {
    this.instrument;
  }
}

export default Voice;
