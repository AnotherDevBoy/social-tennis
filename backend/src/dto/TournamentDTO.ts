import { Tournament } from '../domain/Tournament';

export class TournamentDTO {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  format: object;
  players: object[];
  pairings: object[];
  matches: object[];

  constructor(tournament: Tournament) {
    this.id = tournament.id;
    this.title = tournament.title;
    this.subtitle = tournament.subtitle;
    this.status = tournament.status;
    this.format = tournament.format;
    this.players = tournament.players;
    this.pairings = tournament.pairings;
    this.matches = tournament.matches;
  }

  static fromTournament(tournament: Tournament): TournamentDTO {
    return new TournamentDTO(tournament);
  }
}
