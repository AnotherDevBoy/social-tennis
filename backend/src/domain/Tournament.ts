import { v7 as uuidv7 } from 'uuid';

export type TournamentStatus = 'ENTRY_OPEN' | 'STARTED' | 'COMPLETED';

export interface TournamentFormat {
  // Define format properties as needed
}

export interface Player {
  // Define player properties as needed
}

export interface Pairing {
  // Define pairing properties as needed
}

export interface Match {
  // Define match properties as needed
}

export class Tournament {
  id: string;
  title: string;
  subtitle: string;
  status: TournamentStatus;
  format: TournamentFormat;
  players: Player[];
  pairings: Pairing[];
  matches: Match[];
  admin_password: string;
  user_password: string;

  constructor(
    title: string,
    subtitle: string,
    admin_password: string,
    user_password: string
  ) {
    this.id = uuidv7();
    this.title = title;
    this.subtitle = subtitle;
    this.status = 'ENTRY_OPEN';
    this.format = {};
    this.players = [];
    this.pairings = [];
    this.matches = [];
    this.admin_password = admin_password;
    this.user_password = user_password;
  }
}
