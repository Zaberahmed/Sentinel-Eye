interface Street {
	id?: string;
	name: string;
}
export interface SearchResult {
	latitude: number;
	longitude: number;
	street: Street;
}

export interface SetSearchResult {
	(result: SearchResult): void;
}
