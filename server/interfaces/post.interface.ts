import { Comment } from './comment.interface';
export interface Post {
	text: string[];
	timestamp?: string;
	user_id: string;
	comments?: Comment[];
}
