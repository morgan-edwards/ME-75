import Tone from 'tone';
import User from './user';
import { playState, newSequence } from './gui';

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
const updateMelody = (e) => {
  e.preventDefault();
  playState.sequence.cancel();
  user.setName(e.currentTarget.name.value);
  user.setBday(e.currentTarget.birthday.value);
  user.updateSong();
  Tone.Transport.stop();
  newSequence(user.song);
  setMarquee(e.currentTarget.name.value);
};

userForm.addEventListener('submit', updateMelody);
