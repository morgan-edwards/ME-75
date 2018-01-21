import Tone from 'tone';
import User from './user';
import { playState, newSequence, play } from './gui';

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
const updateMelody = (e) => {
  e.preventDefault();
  playState.sequence.cancel();
  Tone.Transport.stop();
  user.setName(e.currentTarget.name.value);
  user.setBday(e.currentTarget.birthday.value);
  user.updateSong();
  newSequence(user.song);
  setMarquee(e.currentTarget.name.value);
  togglePlay();
};

userForm.addEventListener('submit', updateMelody);
