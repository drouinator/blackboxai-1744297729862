export class ModeManager {
  private mode: 'idle' | 'active' | 'error' = 'idle';
  getMode() {
    return this.mode;
  }
  setMode(newMode: 'idle' | 'active' | 'error') {
    this.mode = newMode;
  }
  toggle() {
    this.mode = this.mode === 'active' ? 'idle' : 'active';
  }
}
