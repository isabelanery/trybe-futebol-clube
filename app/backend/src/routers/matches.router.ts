import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import 'express-async-errors';
import Validate from '../middlewares/validation.middleware';

const router = Router();

router.route('/')
  .get(MatchesController.list)
  .post(
    Validate.token,
    MatchesController.create,
  );

router.route('/search')
  .get(MatchesController.listInProgress);

router.route('/:id/finish')
  .patch(MatchesController.finish);

router.route('/:id')
  .get(MatchesController.findById);

export default router;
