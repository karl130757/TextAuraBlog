import { Post } from '../../models/Post';

/**
 * Interface for post repository operations.
 * Defines the contract for interacting with post data in the repository.
 */
export interface IPostRespository {
	/**
	 * Retrieves all posts from the repository.
	 *
	 * @returns {Promise<Post[]>} A promise that resolves to an array of Post objects.
	 */
	findAll(): Promise<Post[]>;

	/**
	 * Retrieves a post by its unique identifier.
	 *
	 * @param {string} id - The unique identifier of the post.
	 * @returns {Promise<Post | null>} A promise that resolves to the Post object if found, or null if not found.
	 */
	findById(id: string): Promise<Post | null>;

	/**
	 * Retrieves a post by its author.
	 *
	 * @param {string} id - The unique identifier of the post author.
	 * @returns { Promise<Post[]>;>} A promise that resolves to the Post object if found, or null if not found.
	 */
	findByAuthor(id: string): Promise<Post[]>;

	/**
	 * Creates a new post in the repository.
	 *
	 * @param {Partial<Post>} post - The post data to be created, where the fields can be partial.
	 * @returns {Promise<Post>} A promise that resolves to the created Post object.
	 */
	create(post: Partial<Post>): Promise<Post>;

	/**
	 * Updates an existing post in the repository.
	 *
	 * @param {string} id - The unique identifier of the post to be updated.
	 * @param {Partial<Post>} post - The updated post data.
	 * @returns {Promise<Post | null>} A promise that resolves to the updated Post object if found, or null if not found.
	 */
	update(id: string, post: Partial<Post>): Promise<Post | null>;

	/**
	 * Deletes a post from the repository.
	 *
	 * @param {string} id - The unique identifier of the post to be deleted.
	 * @returns {Promise<void>} A promise that resolves when the post is successfully deleted.
	 */
	delete(id: string): Promise<void>;
}
