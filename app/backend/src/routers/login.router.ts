import { Router } from 'express';
import UserController from '../controllers/user.controler';
import Validate from '../middlewares/validation.middleware';
import 'express-async-errors';

const router = Router();

router.route('/')
  .post(
    Validate.login,
    UserController.login,
  );

router.route('/validate')
  .get(
    UserController.validateLogin,
  );

export default router;
