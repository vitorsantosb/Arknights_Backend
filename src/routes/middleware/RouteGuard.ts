import { NextFunction, Request, Response } from 'express';
import { VerifyAuthUserAccessToken } from '@security/jwt-utils';
import GetApiUrl from '@services/url.service';

async function RouteGuard(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await VerifyAuthUserAccessToken(req, res);
    
    if (result === true) {
      return next(); // Continua para a próxima função no middleware
    }
    
    if (!res.headersSent) {
      res.status(401).send({
        message: 'Unauthorized',
        statusCode: 401,
        request: {
          method: 'POST',
          description: 'User isn\'t authenticated',
          URL: `${GetApiUrl()}/guard`,
        },
      });
    }
  } catch (error) {
    next(error); // Passa o erro para o middleware de erro
  }
}




export {
  RouteGuard
}