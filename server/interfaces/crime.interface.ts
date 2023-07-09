import { Location } from './location.interface';
export interface Crime {
	user_id: string;
	category: string;
	location: Location;
	context: string;
	month: string;
}
