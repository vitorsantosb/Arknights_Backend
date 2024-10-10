import {IPayload} from '@security/interfaces/jwt-interfaces';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {Request, Response} from 'express';
import GetApiUrl from '@services/url.service';

const jwt_secret_token = process.env.JWT_TOKEN_SECRET;



async function CreateUserAccessToken(payload: IPayload) {
	if(!jwt_secret_token){
		throw new Error('Missing JWT_TOKEN_SECRET');
	}
	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			jwt_secret_token, //change for .env var after solve problems with .env on typescript
			{
				expiresIn: '24h'
			},
			(err, token) => {
				if (err) {
					return reject(err);
				}
				return resolve(token);
			}
		)
	})
}

async function VerifyAuthUserAccessToken(req: Request, res: Response) {
	const token = req.headers['authorization']?.split(' ')[1];
	
	if (!token) {
		throw new Error('[JWT_GUARD] Token not found');
	}
	if(!jwt_secret_token){
		throw new Error('Missing JWT_TOKEN_SECRET');
	}
	return new Promise((resolve, reject) => {
		try {
			jwt.verify(token, jwt_secret_token, (err) => {
				if (err) {
					res.status(403).send({
						message: 'Unauthorized',
						statusCode: 403,
						request: {
							method: 'POST',
							description: 'Token is expired or invalid!',
							URL: `${GetApiUrl}/auth`,
						},
					});
					return resolve(false)
				} else {
					resolve(true)
				}
			})
		} catch (err) {
			return reject(err);
		}
	})
}

export {
	CreateUserAccessToken,
	VerifyAuthUserAccessToken
}

