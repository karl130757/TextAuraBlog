import bcrypt from 'bcrypt';

/**
 * Utility object for password hashing and verification.
 */
const passwordUtility = {
	/**
	 * Hashes a password using bcrypt.
	 *
	 * @param {string} password - The plain text password to hash.
	 * @param {number} [saltRounds=10] - The number of salt rounds for bcrypt hashing. Defaults to 10.
	 * @returns {Promise<string>} - A promise that resolves to the hashed password.
	 * @throws {Error} - Throws an error if hashing fails.
	 *
	 * @example
	 * const hashedPassword = await passwordUtility.hashPassword('mySecurePassword');
	 */
	hashPassword: async (password: string, saltRounds: number = 10): Promise<string> => {
		try {
			return await bcrypt.hash(password, saltRounds);
		} catch (error) {
			throw new Error('Error hashing password');
		}
	},

	/**
	 * Compares a plain text password with a hashed password.
	 *
	 * @param {string} password - The plain text password to compare.
	 * @param {string} hashedPassword - The previously hashed password.
	 * @returns {Promise<boolean>} - A promise that resolves to `true` if the passwords match, otherwise `false`.
	 * @throws {Error} - Throws an error if comparison fails.
	 *
	 * @example
	 * const isMatch = await passwordUtility.comparePassword('mySecurePassword', hashedPassword);
	 */
	comparePassword: async (password: string, hashedPassword: string): Promise<boolean> => {
		try {
			return await bcrypt.compare(password, hashedPassword);
		} catch (error) {
			throw new Error('Error comparing passwords');
		}
	}
};

export default passwordUtility;
