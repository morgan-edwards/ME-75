

class Composer {
  constructor() {
    this.chords = {
      1: { pitches: [1,3,5], nextChords: [1,2,3,4,5,6,7] },
      2: { pitches: [2,4,6], nextChords: [5,7] },
      3: { pitches: [3,5,7], nextChords: [2,4,6] },
      4: { pitches: [4,6,1], nextChords: [2,5,7] },
      5: { pitches: [5,7,2], nextChords: [1,6] },
      6: { pitches: [6,1,3], nextChords: [4,2] },
      7: { pitches: [7,2,4], nextChords: [1,6] },
    };
    this.pitches = ["C","C#","D","D#","E","F","F","G","G#","A","A#","B"];
    this.octaves = [1,2,3,4,5,6,7];
  }

  generateProgression() {
    const sectionChords = [];
    const allChords = [1,2,3,4,5,6,7];
    let firstChord = allChords[Math.floor(
      Math.random() * 7)];
    sectionChords.push(firstChord);
    let nextChords;
    let nextChord;
    let lastChord;
    let i;
    for (i = 1; i < 4; i++) {
      lastChord = sectionChords[sectionChords.length - 1]
      nextChords = this.chords[sectionChords[sectionChords.length-1]].nextChords;
      nextChord = nextChords[Math.floor(Math.random() * nextChords.length)];
      sectionChords.push(nextChord);
    }
    return sectionChords;
  }

  writeSong() {
    const verse = this.generateProgression();
    const chorus = this.generateProgression();
    const bridge = this.generateProgression();
    return verse.concat(chorus).concat(verse).concat(bridge).concat(chorus);
  }

}
