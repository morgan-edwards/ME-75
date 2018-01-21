import { nameBdayToSong } from './transcribers';

class User {
  constructor(){
    this.name = '';
    this.birthday = '';
    this.mode = 'major';
    this.permittedAlpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
    "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    this.permittedNums = ['0','1','2','3','4','5','6','7','8','9'];
    this.song = [];
  }

  setName(input) {
    let cleanString = input.toLowerCase();
    cleanString = cleanString.split('').filter(ch => this.permittedAlpha.includes(ch));
    this.name = cleanString.join('');
  }

  setBday(input) {
    let cleanString = input.toLowerCase();
    cleanString = cleanString.split('').filter(ch => this.permittedNums.includes(ch));
    this.birthday = cleanString.join('');
  }

  updateSong() {
    this.song = (this.name.length === 0) ? [] :
      nameBdayToSong(this.name, this.birthday, 'major');
  }
}

export default User;
