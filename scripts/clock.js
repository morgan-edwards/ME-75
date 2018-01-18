import Tone from 'tone';

const transportSetting = {
  bpm: 120,
  swing: 0,
  swingSubdivision: "8n",
  timeSignature: [3,4],
  loopStart: 0,
  loopEnd: "4m",
  PPQ: 192
};

export const transport = new Tone.transport();
