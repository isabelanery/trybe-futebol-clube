import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
// import Validate from '../middlewares/validation.middleware';
import 'express-async-errors';

const router = Router();

router.route('/')
  .get(
    // Validate.token,
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

router.route('/home/:id')
  .get(
    LeaderboardController.findById,
  );

export default router;
