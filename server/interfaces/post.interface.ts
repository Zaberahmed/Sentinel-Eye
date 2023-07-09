import { Comment } from "./comment.interface";
export interface Post {
	timestamp: string;
	user_id: string;
	comments: Comment[];
}
