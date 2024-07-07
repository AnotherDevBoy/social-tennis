import 'express-session';

declare module 'express-session' {
  interface SessionData {
    role: string;
    tournament_id: string;
  }
}
