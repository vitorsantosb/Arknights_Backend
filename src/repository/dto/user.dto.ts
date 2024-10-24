import { IUser, IUserDto } from './user.interface';
import {NormalizeEmail} from '@services/email.service';
import {IPayload} from '@security/interfaces/jwt-interfaces';
import {CreateId} from '@configs/uuid/GenUUID';

function CreateUserDto(_id: string, _username: string, _email: string, _hashPassword: string): IUser {
	return {
		id: _id,
		name: _username,
		email: NormalizeEmail(_email),
		password: _hashPassword,
		is_deleted: false,
    chat_list: [],
		sessions: [],
	}
}

function CreateUserPayload(_payloadData: IPayload): IPayload {
	return {
		id: _payloadData.id,
		name: _payloadData.name,
		email: _payloadData.email,
	}
}

function CreateSimpleUserDto(_id: string, _email: string, _name: string): IUserDto {
	return {
		id: _id,
		email: _email,
		name: _name
	}
}

export {
	CreateUserPayload,
	CreateUserDto,
	CreateSimpleUserDto
}