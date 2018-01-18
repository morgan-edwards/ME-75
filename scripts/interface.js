const voiceCounts = {
  bass: 0,
  baritone: 0,
  tenor: 0,
  alto: 0,
  soprano: 0,
};

const addVoiceButtons = []
const addBassBtn = document.getElementById('add-bass');
addVoiceButtons.push(addBassBtn);
const addBaritoneBtn = document.getElementById('add-baritone');
addVoiceButtons.push(addBaritoneBtn);
const addTenorBtn = document.getElementById('add-tenor');
addVoiceButtons.push(addTenorBtn);
const addAltoBtn = document.getElementById('add-alto');
addVoiceButtons.push(addAltoBtn);
const addSopranoBtn = document.getElementById('add-soprano');
addVoiceButtons.push(addSopranoBtn);

addVoiceButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    addVoice(e.target.value);
  });
});

export const addVoice = (range) => {
  const index = parseInt(voiceCounts[range]) + 1;
  voiceCounts[range] = index;
  const id = `${range}${voiceCounts[range]}`;

  const newVoice = document.createElement('div');
  newVoice.setAttribute("id", id);
  newVoice.setAttribute("class", `voice`);

  const playEl = document.createElement('div');
  playEl.setAttribute("nexus-ui", "button");
  playEl.setAttribute("id", `${id}-play`);
  newVoice.appendChild(playEl);

  const volumeEl = document.createElement('div');
  volumeEl.setAttribute("nexus-ui", "dial");
  volumeEl.setAttribute("id", `${id}-volume`);
  newVoice.appendChild(volumeEl);

  const section = document.getElementById(`${range}`);
  section.appendChild(newVoice);
  console.log(voiceCounts);

  const volumeDial = new Nexus.Dial(`${id}-volume`);
  const playButton = new Nexus.Button(`${id}-play`);
};
