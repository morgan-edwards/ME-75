import Tone from 'tone';
import Nexus from './NexusUI';

const synth = new Tone.Synth();
synth.toMaster();

const pattern = new Tone.Pattern((time, note) => {
  synth.triggerAttackRelease(note, 0.25);
}, [440, 550, 660, 770]);

const arpStart = document.getElementById('arp');
  arpStart.addEventListener('click', (e) => {
  pattern.start(0);
  Tone.Transport.start();
});
