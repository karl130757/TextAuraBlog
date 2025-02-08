import { User } from '../models/User';
import { IUserRepository } from './interfaces/IUserRepository';
import { UserModel } from './models/UserModel';

const mapToDomain = (user: any): User => ({
	id: user._id.toString(),
	firstName: user.firstName,
	lastName: user.lastName,
	displayName: user.displayName,
	password: user.password,
	email: user.email,
	deviceToken: user.deviceToken,
	createdAt: user.createdAt || new Date(),
	updatedAt: user.updatedAt || new Date()
});

export class UserRepository implements IUserRepository {
	async findAll(): Promise<User[]> {
		return (await UserModel.find().lean()).map(mapToDomain);
	}

	async findById(id: string): Promise<User | null> {
		const user = await UserModel.findById(id).exec();
		return user ? mapToDomain(user) : null;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await UserModel.findOne({ email }).exec();
		return user ? mapToDomain(user) : null;
	}

	async create(userData: Partial<User>): Promise<User> {
		const newUser = new UserModel(userData);
		const savedUser = await newUser.save();
		return mapToDomain(savedUser);
	}

	async update(id: string, userData: Partial<User>): Promise<User | null> {
		const updatedUser = await UserModel.findByIdAndUpdate(id, userData, { new: true }).exec();
		return updatedUser ? mapToDomain(updatedUser) : null;
	}

	async delete(id: string): Promise<void> {
		await UserModel.findByIdAndDelete(id).exec();
	}
}
