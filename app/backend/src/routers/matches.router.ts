import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import 'express-async-errors';

const router = Router();

router.route('/')
  .get(
    MatchesController.list,
  );

// router.route('/:id')
//   .get(
//     MatchesController.findById,
//   );

export default router;
