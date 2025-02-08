import { NextFunction, Request, Response } from 'express';
import tokenUtility from '../shared/TokenUtility';
import { responseHandler } from '../shared/ResponseHelper';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		responseHandler(res, 401, null, 'Authorization token is missing or invalid');
		return;
	}

	const token = authHeader.split(' ')[1];

	try {
		const decoded = tokenUtility.verifyToken(token);
		(req as any).user = decoded;
		next();
	} catch (error) {
		responseHandler(res, 403, null, 'Invalid or expired token');
		return;
	}
};
