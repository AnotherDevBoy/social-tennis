import express from 'express';
import session from 'express-session';
import TournamentController from './controllers/TournamentController';
import AuthenticationController from './controllers/AuthenticationController';

const app = express();
const port = 3001;

app.use(express.json());

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
  })
);

app.post('/tournament', TournamentController.createTournament);
app.get('/tournament/:id', TournamentController.getTournament);

app.post('/tournament/:tournament_id/login', AuthenticationController.login);
app.post('/tournament/:tournament_id/admin/login', AuthenticationController.adminLogin);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
