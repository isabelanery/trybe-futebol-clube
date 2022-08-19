import { Router } from 'express';
import UserController from '../controllers/user.controler';
import Validate from '../middlewares/validation.middleware';
import 'express-async-errors';

const router = Router();

router.route('/login')
  .post(
    Validate.login,
    UserController.login,
  );

export default router;
