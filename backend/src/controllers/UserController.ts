import _ from 'lodash';
import { User } from '../models/User';
import { Request, Response } from 'express';
import * as userService from '../services/UserService';
import { responseHandler } from '../shared/ResponseHelper';
import passwordUtility from '../shared/PasswordUtility';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const users = await userService.getAllUsers();
		responseHandler(res, 200, users);
	} catch (error) {
		responseHandler(res, 500, null, 'Failed to retrieve users');
	}
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	try {
		const user = await userService.getUserById(id);
		if (user) {
			responseHandler(res, 200, user);
		} else {
			responseHandler(res, 404, null, 'User not found');
		}
	} catch (error) {
		responseHandler(res, 500, null, 'Failed to retrieve user');
	}
};

export const getUserByToken = async (req: Request, res: Response): Promise<void> => {
	const { id } = (req as any).user;

	try {
		const user = await userService.getUserById(id);

		if (user) {
			responseHandler(res, 200, _.omit(user, 'password'));
		} else {
			responseHandler(res, 404, null, 'User not found');
		}
	} catch (error) {
		console.log(error);
		responseHandler(res, 500, null, 'Failed to retrieve user');
	}
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
	const { firstName, lastName, email, password } = req.body;
	const userToCreate: User = { firstName, lastName, email, password };
	userToCreate.password = await passwordUtility.hashPassword(password, 10);
	try {
		const newUser = await userService.createUser(userToCreate);
		responseHandler(res, 201, newUser);
	} catch (error) {
		responseHandler(res, 400, null, 'Failed to create user');
	}
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	const { firstName, lastName, email, password } = req.body;
	const dataToUpdate: User = { firstName, lastName, email, password };
	try {
		const updatedUser = await userService.updateUser(id, dataToUpdate);
		if (updatedUser) {
			responseHandler(res, 200, updatedUser);
		} else {
			responseHandler(res, 404, null, 'User not found');
		}
	} catch (error) {
		responseHandler(res, 400, null, 'Failed to update user');
	}
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	try {
		const message = await userService.deleteUser(id);
		responseHandler(res, 200, { message });
	} catch (error) {
		responseHandler(res, 500, null, 'Failed to delete user');
	}
};
