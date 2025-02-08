import { NextFunction, Request, Response } from 'express';
import { responseHandler } from '../shared/ResponseHelper';

export const canExecuteAction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const { id } = (req as any).user;

	next();
};
