import { Router } from 'express';
import UserController from '../controllers/user.controler';

const router = Router();

router.route('/login')
  .post(UserController.login);

export default router;
