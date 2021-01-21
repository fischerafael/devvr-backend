import { Router } from 'express';
import DislikeController from '../controllers/dislike-controller';
import LikeController from '../controllers/like-controller';
import MatchController from '../controllers/match-controller';
import SessionController from '../controllers/session-controller';
import UserController from '../controllers/user-controller';

const routes = Router();

routes.get('/', (req, res) => res.send('Olá, mundo'));

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/users/matches', MatchController.index);

routes.post('/sessions', SessionController.create);

routes.post('/likes/:liked_user_id', LikeController.create);

routes.post('/dislikes/:liked_user_id', DislikeController.create);

export default routes;
