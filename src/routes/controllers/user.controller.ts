import express from 'express';
import {Request, Response} from 'express';
const router = express.Router();
import {userFunctions} from '@routes/views/user/functions/user.functions';
import { userController } from '@routes/views/user/user';
import { RouteGuard } from '@routes/middleware/RouteGuard';

router.post('/register', userController.register);
router.get('/me', RouteGuard, userController.getUserData);

export default router;