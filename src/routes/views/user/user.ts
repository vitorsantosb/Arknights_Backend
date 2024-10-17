import {Request, Response} from 'express';
import { userFunctions } from '@routes/views/user/functions/user.functions';

export const userController = {
  register: async (req: Request, res: Response)=> {
    await userFunctions.register(req, res);
  },
  getUserData: async(req: Request, res: Response) => {
    await userFunctions.GetUserData(req, res);
  }
}