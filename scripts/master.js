import Tone from 'tone';
import Nexus from './NexusUI';

const synth = new Tone.Synth().toMaster();
const button = new Nexus.Button('#button');



function playSound() {
  synth.triggerAttackRelease("C4", "8n");
}

button.on('click', playSound);
