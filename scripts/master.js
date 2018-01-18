// import Tone from 'tone';
// import Nexus from './NexusUI';
//
// const oscOne = new Tone.OmniOscillator();
// const envelope = new Tone.AmplitudeEnvelope();
// oscOne.connect(envelope);
// envelope.toMaster();
//
// const button = new Nexus.Button('#button');
//
// const voiceOne = {
//   freq: 440,
// };
//
// function setFreq(voice, freq) {
//   voice.frequency.value = voiceOne.freq
// }
//
// function triggerSound(osc, env) {
//   console.log('starting');
//   osc.start();
//   env.triggerAttack();
// }
//
// button.on('click', (v) => {
//   triggerSound(oscOne, envelope);
// });
//
// const freqSlide = document.getElementById('frequency');
// freqSlide.addEventListener('input', (e) => {
//   voiceOne.freq = e.target.value;
//   setFreq(oscOne, voiceOne.freq)
//   console.log(voiceOne);
// });
