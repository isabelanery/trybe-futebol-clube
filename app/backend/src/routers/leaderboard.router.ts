import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import 'express-async-errors';

const router = Router();

router.route('/')
  .get(
    LeaderboardController.listAllMatches,
  );

router.route('/home')
  .get(
    LeaderboardController.listHomeMatches,
  );

router.route('/away')
  .get(
    LeaderboardController.listAwayMatches,
  );

export default router;
