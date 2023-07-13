import { Comment } from './comment.interface';
export interface Post {
	_id?: string;
	type: string;
	text: string;
	timestamp: string;
	user_id: string;
	comments?: Comment[];
}
