import { Router } from 'express';
import TeamsController from '../controllers/team.controller';
import 'express-async-errors';

const router = Router();

router.route('/')
  .get(
    TeamsController.list,
  );

export default router;
