export interface Post {
	id: string;
	title: string;
	content: string;
	author: string;
	status: string;
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
}
