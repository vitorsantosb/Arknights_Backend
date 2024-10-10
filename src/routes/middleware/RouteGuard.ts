import { NextFunction, Request, Response } from 'express';
import { VerifyAuthUserAccessToken } from '@security/jwt-utils';
import GetApiUrl from '@services/url.service';

async function RouteGuard(req: Request, res: Response, next: NextFunction) {
  const result = await VerifyAuthUserAccessToken(req, res);
  
  if (result === true) {
    return next();
  }
  
  if(res.headersSent) return;
  
  return res.status(401).send({
    message: 'Unauthorized',
    statusCode: 401,
    request: {
      method: 'POST',
      description: 'User isn\'t authenticated',
      URL: `${GetApiUrl()}/guard`,
    },
  });
}



export {
  RouteGuard
}