import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
// import Validate from '../middlewares/validation.middleware';
import 'express-async-errors';

const router = Router();

router.route('/home')
  .get(
    // Validate.token,
    LeaderboardController.list,
  );

router.route('/home/:id')
  .get(
    LeaderboardController.findById,
  );

export default router;
