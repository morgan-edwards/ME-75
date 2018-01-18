const voiceCounts = {
  bass: 0,
  baritone: 0,
  tenor: 0,
  alto: 0,
  soprano: 0,
};

const addVoiceBtn = document.getElementById('add-voice');
addVoiceBtn.addEventListener('click', () => addVoice('bass'));

const addVoice = (range) => {
  const index = parseInt(voiceCounts[range]) + 1;
  voiceCounts[range] = index;

  const newVoice = document.createElement('div');
  newVoice.setAttribute("id", `${range}${voiceCounts[range]}`);
  newVoice.setAttribute("class", `voice`);

  const section = document.getElementById('voices');
  section.appendChild(newVoice);
  console.log(voiceCounts);
};
