import { Request, Response } from 'express';
import TournamentService from '../services/TournamentService';

class AuthenticationController {
  static login(req: Request, res: Response) {
    const { tournament_id } = req.params;
    const { password } = req.body;

    const tournament = TournamentService.getTournamentById(tournament_id);

    if (!tournament) {
      return res.status(404).json({ error: `Tournament with ID ${tournament_id} not found` });
    }

    if (tournament.user_password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Create a session and assign the player role
    req.session.role = 'player';
    req.session.tournament_id = tournament.id;

    res.sendStatus(200); // Send a 200 status without a response body
  }

  static adminLogin(req: Request, res: Response) {
    const { tournament_id } = req.params;
    const { password } = req.body;

    const tournament = TournamentService.getTournamentById(tournament_id);

    if (!tournament) {
      return res.status(404).json({ error: `Tournament with ID ${tournament_id} not found` });
    }

    if (tournament.admin_password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Create a session and assign the admin role
    req.session.role = 'admin';
    req.session.tournament_id = tournament.id;

    res.sendStatus(200); // Send a 200 status without a response body
  }
}

export default AuthenticationController;
