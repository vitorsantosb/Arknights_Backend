import {register} from '../functions/crud/POST/register.function'
import {GetUserData} from '../functions/crud/GET/GetUserData.function';
import {GetUsers} from '../functions/crud/GET/GetUsersList.function';

export const userFunctions = {
	register,
	GetUserData,
	GetUsers
}

