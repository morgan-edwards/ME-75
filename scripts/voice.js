import Tone from 'tone';
import { voiceCounts } from './interface';

class Voice {
  constructor(range, instrument) {
    this.state = { playing: false }
    this.range = range;
    this.instrument = new instrument();
    this.index = parseInt(voiceCounts[range]) + 1;
    this.volume = new Tone.Volume();
    voiceCounts[range] = this.index;
    this.instrument.chain(this.volume, Tone.Master);
    this.id = `${range}${voiceCounts[range]}`;
    this.addVoice(this.range, this.id);
  }

  addVoice(range, id) {
    const voiceDiv = (`
      <div id=${id} class='voice'>
        <button id='${id}-play'>Play</button>
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
    $(`#${id}-play`).click(this.togglePlay.bind(this));
    $(`#${id}-volume`).on('input', this.adjustVolume.bind(this));
    $(`#${id}-delete`).click(() => $(`#${id}`).remove())
    this.togglePlay();
  }

  adjustVolume(e) {
    this.volume.volume.value = parseFloat(e.target.value);
    console.log(this.volume);
  }

  togglePlay() {
    this.state['playing'] = !this.state.playing;
    if (this.state.playing) {
      this.instrument.triggerAttack("F4");
    } else {
      this.instrument.triggerRelease();
    }
    console.log('pressed');
  }

  instrument() {
    this.instrument;
  }
}

export default Voice;
