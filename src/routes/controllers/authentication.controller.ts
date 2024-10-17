import express from 'express';
import { authController } from '@routes/views/auth/auth';
const router = express.Router();

router.post('/login', authController.guard)

export default router;