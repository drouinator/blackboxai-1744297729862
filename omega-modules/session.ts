export class SessionManager {
  private sessions: Record<string, any> = {};
  createSession(userId: string) {
    this.sessions[userId] = { created: Date.now() };
    return this.sessions[userId];
  }
  getSession(userId: string) {
    return this.sessions[userId] || null;
  }
}
