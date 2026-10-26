type Wave = OscillatorType;

/** Tiny chiptune sound effects synthesized with the Web Audio API. */
class Sound {
  private ctx: AudioContext | null = null;
  enabled = true;

  /** Must be called from a user gesture before sounds can play. */
  ensure(): void {
    if (!this.ctx) {
      try {
        const Ctor =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (Ctor) this.ctx = new Ctor();
      } catch {
        this.ctx = null;
      }
    }
    if (this.ctx?.state === "suspended") void this.ctx.resume();
  }

  private tone(freq: number, duration = 0.06, type: Wave = "square", volume = 0.035, when = 0): void {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime + when;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + duration + 0.02);
  }

  blip = () => this.tone(900, 0.025, "square", 0.015);
  move = () => this.tone(660, 0.05);
  select = () => {
    this.tone(988, 0.06);
    this.tone(1319, 0.08, "square", 0.035, 0.06);
  };
  back = () => {
    this.tone(523, 0.06);
    this.tone(392, 0.08, "square", 0.035, 0.06);
  };
  hit = () => this.tone(150, 0.16, "sawtooth", 0.05);
  encounter = () => [523, 659, 784, 1047, 784, 1047].forEach((f, i) => this.tone(f, 0.09, "square", 0.04, i * 0.09));
  levelUp = () => [523, 659, 784, 1047, 1319].forEach((f, i) => this.tone(f, 0.13, "triangle", 0.07, i * 0.1));
}

export const sound = new Sound();
