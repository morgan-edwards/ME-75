import Tone from 'tone';
import User from './user';
import { playState, newSequence } from './gui';

const user = new User();

const userForm = document.getElementById('user-info');

userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  user.setName(e.currentTarget.name.value);
  user.setBday(e.currentTarget.birthday.value);
  user.updateSong();
  console.log(user.song);
  playState.sequence.cancel();
  playState.music = user.song;
  newSequence(playState.music);
});
