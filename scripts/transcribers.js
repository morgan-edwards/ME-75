export const nameToPitches = (string) => {
  string = string.toLowerCase();
  const base35 = ["1", "2", "3", "4", "5", "6", "7", "8", "9",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
    "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  const stringVals = string.split('').reduce((acc, ch) => {
    acc.unshift(base35.indexOf(ch)+1);
    return acc;
  }, []);
  const base10 = stringVals.map((num, idx) => num * Math.pow(35, idx))
    .reduce((acc, el) => acc + el);
  let base7 = [];
  let decimal = base10;
  do {
    base7.unshift(decimal % 7);
    decimal = Math.floor(decimal/7);
  } while (decimal !== 0);

  return base7;
};

export const nameToKey = (string, mode) => {
  const pitches = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  let tonic = Math.floor((string[0].charCodeAt() - 96) / 2);
  if (tonic > 12) tonic = 1;
  const steps = (mode === 'major') ? [2,2,1,2,2,2] : [2,1,2,2,1,2];
  const key = [pitches[tonic]];

  steps.forEach((step) => {
    let prevPitch = key[key.length-1];
    key.push(pitches[(pitches.indexOf(prevPitch) + step) % 12]);
  });
  return key;
};

export const nameToMelody = (name, mode) => {
  const numArray = nameToPitches(name);
  const key = nameToKey(name, mode);
  const melody = numArray.map(num => key[num]+'2');
  return melody;
};
