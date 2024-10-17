import { Response, Request } from 'express';
import { DecodedUserJwtPayload} from '@security/jwt-utils';
import { ExistsAndGetUserWithId } from '@repository/user.repository';
import { CreateSimpleUserDto } from '@repository/dto/user.dto';

export const GetUserData = async (req: Request, res: Response) => {
  const _token = req.cookies.authToken;
  
  if(!_token){
    return res.status(422).send({
      message: 'No token provided',
      statusCode: 422,
    })
  }
  
  const _userPayload = DecodedUserJwtPayload(_token);
  const _currentUser = await ExistsAndGetUserWithId(_userPayload.id)
  
  if(_currentUser){
    return res.status(200).send({
      message: 'Successfully get user data',
      statusCode: 200,
      user: CreateSimpleUserDto(_currentUser.id, _currentUser.email, _currentUser.name),
    })
  }else {
    return res.status(400).send({
      message: 'User not found',
      statusCode: 400,
    })
  }
}