const nameToNumerals = (string) => {
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

const nameToKey = (string, mode) => {
  const pitches = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  let tonic = Math.floor((string[0].charCodeAt() - 96) / 2);
  if (tonic > 12) tonic = 1;
  const steps = (mode === 'minor') ? [2,1,2,2,1,2] : [2,2,1,2,2,2];
  const key = [pitches[tonic]];

  steps.forEach((step) => {
    let prevPitch = key[key.length-1];
    key.push(pitches[(pitches.indexOf(prevPitch) + step) % 12]);
  });
  return key;
};

const nameToMelody = (name, mode) => {
  const numArray = nameToNumerals(name);
  const key = nameToKey(name, mode);
  const melody = numArray.map(num => key[num]+'4');
  return melody;
};

const pitches = ["C", "B", "A", "G"];

const numToSubdivision = digit => {
  const subdivision = { count: 0, pitches: [] };
  let subCount;
  if (digit === 0) {
    subCount = 1;
  } else if (digit < 5) {
    subCount = digit;
  } else if (digit > 4) {
    subdivision.pitches.push(null);
    subCount = digit % 4;
  }
  subdivision.count = subCount;
  return subdivision;
};

const birthdayToBeats = (numString) => {
  const pattern = [];
  let i;
  for (i = 0; i < 8; i++) {
    pattern.push(numToSubdivision(parseInt(numString[i])));
  }
  return pattern;
};

const fillBeats = (pitches, beats) => {
  let currentIdx = 0;
  beats.forEach(beat => {
    let i;
    for (i = 0; i < beat.count; i++) {
      currentIdx = (currentIdx > (pitches.length - 1)) ? 0 : currentIdx;
      beat.pitches.push(pitches[currentIdx]);
      currentIdx++;
    }
  });
  return beats;
};

const beatsToMelody = (beats) => {
  const mapped = beats.map(beat => {
    if (beat.pitches.length === 1) {
      return beat.pitches[0];
    } else {
      return beat.pitches;
    }
  });
  return mapped;
};

const nameBdayToSong = (name, bday, mode) => {
  const pitches = nameToMelody(name, mode);
  const beats = birthdayToBeats(bday);
  return beatsToMelody(fillBeats(pitches, beats));
};
