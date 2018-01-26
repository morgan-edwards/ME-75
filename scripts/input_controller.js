import Tone from 'tone';
import User from './user';
import { playState, newSequence, rickRoll, play } from './gui';

const user = new User();
const userForm = document.getElementById('user-info');
const marquee = document.getElementById('now-playing');
const setMarquee = (name) => {

  if (name === '') {
    marquee.innerHTML = `Enter your information and press play to hear your melody`;
  } else {
    marquee.innerHTML = `Now Playing&nbsp;:&nbsp;&nbsp;${name}`;
  }
};
const togglePlay = () => {
  if (!playState.playing) play.click();
};

export const updateOctave = () => {
  playState.sequence.cancel();
  user.updateSong();
  newSequence(user.song);
  togglePlay();
};

const updateMelody = (e) => {
  e.preventDefault();
  if (playState.roll) {
    playState.roll.stop();
    playState.roll = null;
  }
  playState.sequence.cancel();
  user.setName(e.currentTarget.name.value);
  user.setBday(e.currentTarget.birthday.value);
  user.updateSong();
  if (user.name === 'morganedwards' && user.birthday === '19851014') {
    rickRoll();
    setMarquee("RICK ROLLED!");
  } else {
    newSequence(user.song);
    setMarquee(e.currentTarget.name.value);
  }
  togglePlay();
};

userForm.addEventListener('submit', updateMelody);

const keyMappings = $('.key-mappings');
$('#key-map').hover(
  () => keyMappings.addClass('visible'),
  () => keyMappings.removeClass('visible')
);
