import { Tournament } from '../domain/Tournament';

class TournamentService {
  private tournaments: Map<string, Tournament>;

  constructor() {
    this.tournaments = new Map<string, Tournament>();
  }

  createTournament(tournament: Tournament): Tournament {
    this.tournaments.set(tournament.id, tournament);
    return tournament;
  }

  getTournamentById(id: string): Tournament | undefined {
    return this.tournaments.get(id);
  }

  getAllTournaments(): Tournament[] {
    return Array.from(this.tournaments.values());
  }

  updateTournament(id: string, tournamentData: Partial<Tournament>): Tournament | undefined {
    const existingTournament = this.tournaments.get(id);

    if (existingTournament) {
      if (tournamentData.title !== undefined) existingTournament.title = tournamentData.title;
      if (tournamentData.subtitle !== undefined) existingTournament.subtitle = tournamentData.subtitle;
      if (tournamentData.status !== undefined) existingTournament.status = tournamentData.status;
      if (tournamentData.format !== undefined) existingTournament.format = tournamentData.format;
      if (tournamentData.players !== undefined) existingTournament.players = tournamentData.players;
      if (tournamentData.pairings !== undefined) existingTournament.pairings = tournamentData.pairings;
      if (tournamentData.matches !== undefined) existingTournament.matches = tournamentData.matches;

      return existingTournament;
    }

    return undefined;
  }

  deleteTournament(id: string): boolean {
    return this.tournaments.delete(id);
  }
}

export default new TournamentService();
