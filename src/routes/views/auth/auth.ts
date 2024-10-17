import {Request, Response} from 'express';
import { authFunctions } from '@routes/views/auth/functions/auth.functions';

export const authController = {
  guard: async (req: Request, res: Response) => {
    await authFunctions.login(req, res);
  }
}