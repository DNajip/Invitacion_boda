const fs = require('fs');

// Generate 44.1kHz 16-bit stereo WAV with romantic ambient piano/harp chords
const sampleRate = 44100;
const bpm = 60;
const chordDuration = 2.5; // seconds per chord
// Pachelbel Canon progression: D -> A -> Bm -> F#m -> G -> D -> G -> A (8 chords * 2.5s = 20s)
const chords = [
  // D major: D4, F#4, A4, D5
  [293.66, 369.99, 440.00, 587.33],
  // A major: C#4, E4, A4, E5
  [277.18, 329.63, 440.00, 659.25],
  // B minor: B3, D4, F#4, B4
  [246.94, 293.66, 369.99, 493.88],
  // F# minor: A3, C#4, F#4, C#5
  [220.00, 277.18, 369.99, 554.37],
  // G major: G3, B3, D4, G4
  [196.00, 246.94, 293.66, 392.00],
  // D major: D3, A3, D4, F#4
  [146.83, 220.00, 293.66, 369.99],
  // G major: G3, D4, G4, B4
  [196.00, 293.66, 392.00, 493.88],
  // A major: A3, E4, A4, C#5
  [220.00, 329.63, 440.00, 554.37],
];

const totalSeconds = chords.length * chordDuration;
const totalSamples = Math.floor(sampleRate * totalSeconds);
const leftChannel = new Float32Array(totalSamples);
const rightChannel = new Float32Array(totalSamples);

chords.forEach((chord, chordIdx) => {
  const chordStartSample = Math.floor(chordIdx * chordDuration * sampleRate);
  
  // Play gentle arpeggiated notes for each chord
  chord.forEach((freq, noteIdx) => {
    const noteDelay = noteIdx * 0.28; // gentle arpeggio ripple
    const noteStartSample = chordStartSample + Math.floor(noteDelay * sampleRate);
    const noteDuration = chordDuration * 1.5; // sustain across chord change
    const noteSamples = Math.floor(noteDuration * sampleRate);

    for (let i = 0; i < noteSamples; i++) {
      const sampleIdx = noteStartSample + i;
      if (sampleIdx >= totalSamples) break;

      const t = i / sampleRate;
      // Exponential decay envelope like a romantic acoustic piano/harp
      const attack = Math.min(1.0, t / 0.04);
      const decay = Math.exp(-t * 1.25);
      const env = attack * decay;

      // Harmonics (fundamental + 2nd + 3rd harmonic for warm bell/piano tone)
      const wave = (
        Math.sin(2 * Math.PI * freq * t) * 0.65 +
        Math.sin(4 * Math.PI * freq * t) * 0.25 +
        Math.sin(6 * Math.PI * freq * t) * 0.10
      );

      // Stereo pan: alternate notes slightly left/right for acoustic dimension
      const pan = 0.5 + (noteIdx % 2 === 0 ? -0.15 : 0.15);
      leftChannel[sampleIdx] += wave * env * 0.22 * (1 - pan);
      rightChannel[sampleIdx] += wave * env * 0.22 * pan;
    }
  });
});

// Soft ambient reverb / delay trail
const delaySamples = Math.floor(sampleRate * 0.35);
for (let i = delaySamples; i < totalSamples; i++) {
  leftChannel[i] += rightChannel[i - delaySamples] * 0.28;
  rightChannel[i] += leftChannel[i - delaySamples] * 0.28;
}

// Write standard 16-bit stereo WAV
const buffer = Buffer.alloc(44 + totalSamples * 4);
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + totalSamples * 4, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // subchunk1 size
buffer.writeUInt16LE(1, 20);  // PCM format
buffer.writeUInt16LE(2, 22);  // 2 channels (stereo)
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * 4, 28); // byte rate
buffer.writeUInt16LE(4, 32);  // block align
buffer.writeUInt16LE(16, 34); // bits per sample
buffer.write('data', 36);
buffer.writeUInt32LE(totalSamples * 4, 40);

let offset = 44;
for (let i = 0; i < totalSamples; i++) {
  const leftClamped = Math.max(-1, Math.min(1, leftChannel[i]));
  const rightClamped = Math.max(-1, Math.min(1, rightChannel[i]));
  buffer.writeInt16LE(Math.floor(leftClamped * 32767), offset);
  buffer.writeInt16LE(Math.floor(rightClamped * 32767), offset + 2);
  offset += 4;
}

fs.writeFileSync('public/audio/ambient-romance.wav', buffer);
console.log('ambient-romance.wav created successfully, size:', buffer.length, 'bytes');
