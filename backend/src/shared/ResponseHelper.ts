import { Response } from 'express';

/**
 * Handles sending JSON responses in a standardized format.
 *
 * @param {Response} res - The Express response object.
 * @param {number} status - The HTTP status code to send.
 * @param {any} [data=null] - The response data (optional, defaults to null).
 * @param {string} [error=''] - The error message (optional, defaults to an empty string).
 * @returns {void}
 */
export const responseHandler = (res: Response, status: number, data: any = null, error: string = ''): void => {
	if (error) {
		res.status(status).json({ success: false, message: error });
	} else {
		res.status(status).json({ success: true, data });
	}
};
