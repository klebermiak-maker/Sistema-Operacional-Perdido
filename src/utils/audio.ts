// Web Audio API Synthesizer & Speech Helper for educational game

class SoundManager {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user interaction
    if (typeof window !== 'undefined') {
      const unlock = () => {
        this.unlock();
        window.removeEventListener('pointerdown', unlock);
        window.removeEventListener('keydown', unlock);
      };
      window.addEventListener('pointerdown', unlock, { passive: true });
      window.addEventListener('keydown', unlock, { passive: true });
    }
  }

  public unlock() {
    this.initCtx();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }

  // Click or selection sound
  public playClick() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Ignore audio failure
    }
  }

  // Correct answer chime (pleasant major chord arpeggio)
  public playCorrect() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.18, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.3);
      });
    } catch {
      // Ignore
    }
  }

  // Incorrect answer feedback (gentle low tone)
  public playIncorrect() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(170, now + 0.22);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // Ignore
    }
  }

  // Phase complete fanfare
  public playPhaseComplete() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [
        { f: 523.25, d: 0.12 }, // C
        { f: 659.25, d: 0.12 }, // E
        { f: 783.99, d: 0.12 }, // G
        { f: 1046.5, d: 0.35 }  // High C
      ];

      let t = now;
      notes.forEach((n) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, t);

        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + n.d);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(t);
        osc.stop(t + n.d);
        t += n.d * 0.85;
      });
    } catch {
      // Ignore
    }
  }

  // Grand Victory Fanfare
  public playGrandVictory() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const chords = [
        [523.25, 659.25, 783.99], // C
        [587.33, 739.99, 880.00], // D
        [659.25, 830.61, 987.77], // E
        [783.99, 987.77, 1318.51] // G chord high
      ];

      chords.forEach((chord, i) => {
        const chordTime = now + i * 0.22;
        chord.forEach((freq) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, chordTime);

          gain.gain.setValueAtTime(0.12, chordTime);
          gain.gain.exponentialRampToValueAtTime(0.001, chordTime + 0.35);

          osc.connect(gain);
          gain.connect(this.ctx!.destination);

          osc.start(chordTime);
          osc.stop(chordTime + 0.38);
        });
      });
    } catch {
      // Ignore
    }
  }
}

export const soundManager = new SoundManager();

// Text to Speech Reader Helper for 5th graders
let cachedPtVoice: SpeechSynthesisVoice | null = null;

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const updateVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    cachedPtVoice = voices.find(v => v.lang === 'pt-BR' || v.lang === 'pt_BR') ||
                    voices.find(v => v.lang.startsWith('pt')) || null;
  };
  updateVoice();
  window.speechSynthesis.onvoiceschanged = updateVoice;
}

export function readTextAloud(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any pending speech
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    const cleanText = text.replace(/<[^>]*>?/gm, '').trim();
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.98; // slightly slower for clear 5th grade comprehension
    utterance.pitch = 1.05;

    // Pick pt-BR voice if present
    if (!cachedPtVoice) {
      const voices = window.speechSynthesis.getVoices();
      cachedPtVoice = voices.find(v => v.lang === 'pt-BR' || v.lang === 'pt_BR') ||
                      voices.find(v => v.lang.startsWith('pt')) || null;
    }

    if (cachedPtVoice) {
      utterance.voice = cachedPtVoice;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  } catch {
    if (onEnd) onEnd();
  }
}

export function stopSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
