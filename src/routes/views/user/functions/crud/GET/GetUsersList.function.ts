import { Request, Response } from 'express';
import {
  CountTotalUsers, CountUsersWithName,
  GetUsersListWithPagination,
  GetUsersListWithPaginationBasedOnUsername,
  GetUsersList
} from '@repository/user.repository';
import { CreateSimpleUserDto } from '@repository/dto/user.dto';
import GetApiUrl from '@services/url.service';

export const GetUsers = async (req: Request, res: Response) => {
  const { page, limit, name } = req.query;
  
  if (page && limit) {
    if (name) {
      const _queryResult = await GetUsersListWithPaginationBasedOnUsername(parseInt(page as string), parseInt(limit as string), name as string);
      const _queryCount = await CountUsersWithName(name as string);
      
      const _usersList = [];
      
      for (let i = 0; i < _queryResult.length; i++) {
        _usersList.push(CreateSimpleUserDto(_queryResult[i].id, _queryResult[i].name, _queryResult[i].email));
      }
      
      if (_usersList.length > 0) {
        res.status(200).send({
          message: 'Successfully',
          statusCode: 200,
          request: {
            message: 'Successfully get user list with pagination',
            method: 'GET',
            url: `${GetApiUrl()}/user/list`,
          },
          data: _usersList,
          total: _queryResult.length,
          totalPages: Math.ceil(_queryCount / Number(limit)),
        });
      } else {
        return res.status(204).send({
          message: 'Successfully',
          statusCode: 204,
          request: {
            message: `No content array of users is empty with this ${name}`,
            method: 'GET',
            url: `${GetApiUrl()}/user/list`,
          },
        });
      }
    }
    const _queryResult = await GetUsersListWithPagination(parseInt(page as string), parseInt(limit as string));
    const _queryCount = await CountTotalUsers();
    const _usersList = [];
    
    for (let i = 0; i < _queryResult.length; i++) {
      _usersList.push(CreateSimpleUserDto(_queryResult[i].id, _queryResult[i].name, _queryResult[i].email));
    }
    
    if (_usersList.length > 0) {
      res.status(200).send({
        message: 'Successfully',
        statusCode: 200,
        request: {
          message: 'Successfully get user list with pagination',
          method: 'GET',
          url: `${GetApiUrl()}/user/list`,
        },
        data: _usersList,
        total: _queryResult.length,
        totalPages: Math.ceil(_queryCount / Number(limit)),
      });
    }else {
      return res.status(204).send({
        message: 'Successfully',
        statusCode: 204,
        request: {
          message: 'No content array of users is empty',
          method: 'GET',
          url: `${GetApiUrl()}/user/list`,
        },
      });
    }
    
  } else {
    const _queryResult = await GetUsersList();
    const _usersList = [];
    
    for (let i = 0; i < _queryResult.length; i++) {
      _usersList.push(CreateSimpleUserDto(_queryResult[i].id, _queryResult[i].name, _queryResult[i].email));
    }
    
    if(_usersList.length > 0) {
      res.status(200).send({
        message: 'Successfully',
        statusCode: 200,
        request: {
          message: 'Successfully get user list with pagination',
          method: 'GET',
          url: `${GetApiUrl()}/user/list`,
        },
        data: _usersList,
      });
    }else {
      return res.status(204).send({
        message: 'Successfully',
        statusCode: 204,
        request: {
          message: 'No content array of users is empty',
          method: 'GET',
          url: `${GetApiUrl()}/user/list`,
        },
      });
    }
  }
};