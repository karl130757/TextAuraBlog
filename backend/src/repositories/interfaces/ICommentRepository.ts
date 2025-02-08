import { Comment } from '../../models/Comment';

/**
 * Interface for comment repository operations.
 * Defines the contract for interacting with comment data in the repository.
 */
export interface ICommentRepository {
	/**
	 * Retrieves all comments from the repository.
	 *
	 * @returns {Promise<Comment[]>} A promise that resolves to an array of Comment objects.
	 */
	findAll(): Promise<Comment[]>;

	/**
	 * Retrieves a comment by its unique identifier.
	 *
	 * @param {string} id - The unique identifier of the comment.
	 * @returns {Promise<Comment | null>} A promise that resolves to the Comment object if found, or null if not found.
	 */
	findById(id: string): Promise<Comment | null>;

	/**
	 * Creates a new comment in the repository.
	 *
	 * @param {Partial<Comment>} comment - The comment data to be created, where the fields can be partial.
	 * @returns {Promise<Comment>} A promise that resolves to the created Comment object.
	 */
	create(comment: Partial<Comment>): Promise<Comment>;

	/**
	 * Updates an existing comment in the repository.
	 *
	 * @param {string} id - The unique identifier of the comment to be updated.
	 * @param {Partial<Comment>} comment - The updated comment data.
	 * @returns {Promise<Comment | null>} A promise that resolves to the updated Comment object if found, or null if not found.
	 */
	update(id: string, comment: Partial<Comment>): Promise<Comment | null>;

	/**
	 * Deletes a comment from the repository.
	 *
	 * @param {string} id - The unique identifier of the comment to be deleted.
	 * @returns {Promise<void>} A promise that resolves when the comment is successfully deleted.
	 */
	delete(id: string): Promise<void>;
}
