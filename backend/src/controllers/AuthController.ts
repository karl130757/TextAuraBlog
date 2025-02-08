import { User } from '../models/User';
import { Request, Response } from 'express';
import * as userService from '../services/UserService';
import { responseHandler } from '../shared/ResponseHelper';
import tokenUtility from '../shared/TokenUtility';
import passwordUtility from '../shared/PasswordUtility';

export const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body;
		const user = await userService.getUserByEmail(email);

		if (!user) {
			responseHandler(res, 404, null, 'Invalid email or password');
			return;
		}

		const hashedPassword: string = user.password as string;
		if (!(await passwordUtility.comparePassword(password, hashedPassword))) {
			responseHandler(res, 404, null, 'Invalid email or password');
			return;
		}

		const token: string = tokenUtility.generateToken(user);
		responseHandler(res, 200, { token });
	} catch (error) {
		console.log(error);
		responseHandler(res, 500, null, 'Server Error');
	}
};

export const signup = async (req: Request, res: Response): Promise<void> => {
	const { firstName, lastName, displayName, email, password } = req.body;

	const user = await userService.getUserByEmail(email);
	if (user) {
		responseHandler(res, 404, null, 'User Already Exist!.');
		return;
	}

	try {
		const userToCreate: User = { firstName, lastName, displayName, email, password };
		userToCreate.password = await passwordUtility.hashPassword(password, 10);
		const newUser = await userService.createUser(userToCreate);
		const token: string = tokenUtility.generateToken(newUser);
		responseHandler(res, 201, { token });
	} catch (error) {
		console.log(error);
		responseHandler(res, 400, null, 'Signup Process Failed!');
	}
};
