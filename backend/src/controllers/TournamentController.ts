import { Request, Response } from 'express';
import { Tournament } from '../domain/Tournament';
import { CreateTournamentDTO } from '../dto/CreateTournamentDTO';
import { TournamentDTO } from '../dto/TournamentDTO';
import TournamentService from '../services/TournamentService';

class TournamentController {
  static createTournament(req: Request, res: Response) {
    const validation = CreateTournamentDTO.validate(req.body);

    if (!validation.valid) {
      return res.status(400).json(validation.error);
    }

    const createTournamentDTO = CreateTournamentDTO.fromRequestBody(req.body);

    const newTournament = new Tournament(
      createTournamentDTO.title,
      createTournamentDTO.subtitle || '',
      createTournamentDTO.admin_password || '',
      createTournamentDTO.user_password || ''
    );

    const createdTournament = TournamentService.createTournament(newTournament);

    const response = TournamentDTO.fromTournament(createdTournament);

    res.status(201).json(response);
  }

  static getTournament(req: Request, res: Response) {
    const { id } = req.params;
    const { role, tournament_id } = req.session;

    if (!role || !['player', 'admin'].includes(role) || tournament_id !== id) {
      return res.status(401).json({
        error_code: 'UNAUTHORIZED',
        message: "You don't have permissions to perform this action"
      });
    }

    const tournament = TournamentService.getTournamentById(id);

    if (!tournament) {
      return res.status(404).json({ error: `Tournament with ID ${id} not found` });
    }

    const response = TournamentDTO.fromTournament(tournament);

    res.status(200).json(response);
  }
}

export default TournamentController;
