import jwt, { Secret, SignOptions, JwtPayload, VerifyOptions } from 'jsonwebtoken';

/**
 * Utility object for JWT operations.
 */
const tokenUtility = {
	/**
	 * Generates a JWT token using the provided payload and options.
	 *
	 * @param {object} payload - The data to include in the token. This will be encoded and included in the JWT.
	 * @param {object} [options={ expiresIn: '1h' }] - Optional configuration options for the JWT. Defaults to an expiration time of 1 hour.
	 * @param {string} options.expiresIn - The duration for which the token will be valid (e.g., '1h', '2d'). Defaults to '1h'.
	 * @returns {string} - The signed JWT token as a string.
	 * @throws {Error} - Throws an error if the JWT_SECRET environment variable is not defined or is invalid.
	 *
	 * @example
	 * const token = jwtUtils.generateToken({ userId: 123 }, { expiresIn: '2h' });
	 */
	generateToken: (payload: object, options: object = { expiresIn: '1h' }): string => {
		const secretKey: Secret = process.env.JWT_SECRET || 'your_default_secret_key';
		const signOptions: SignOptions = { ...options };

		if (!secretKey || typeof secretKey !== 'string') {
			throw new Error('JWT_SECRET is not defined in the environment variables.');
		}

		return jwt.sign({ ...payload }, secretKey, signOptions);
	},

	/**
	 * Verifies a JWT token and returns the decoded payload if valid.
	 *
	 * @param {string} token - The JWT token to verify.
	 * @param {VerifyOptions} [options={}] - Optional configuration options for the JWT verification.
	 * @returns {JwtPayload} - The decoded payload if the token is valid.
	 * @throws {Error} - Throws an error if the token is invalid or expired.
	 *
	 * @example
	 * try {
	 *   const decoded = jwtUtils.verifyToken(token);
	 *   console.log(decoded);
	 * } catch (error) {
	 *   console.error('Invalid or expired token', error);
	 * }
	 */
	verifyToken: (token: string, options: VerifyOptions = {}): JwtPayload => {
		const secretKey: string = process.env.JWT_SECRET || 'your_default_secret_key';

		if (!secretKey || typeof secretKey !== 'string') {
			throw new Error('JWT_SECRET is not defined in the environment variables.');
		}

		try {
			const decoded = jwt.verify(token, secretKey, options);

			if (typeof decoded === 'string') {
				throw new Error('Invalid token');
			}
			return decoded;
		} catch (error) {
			throw new Error('Invalid or expired token');
		}
	}
};

export default tokenUtility;
