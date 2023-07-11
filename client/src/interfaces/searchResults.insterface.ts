export interface SearchResult {
	latitude: number;
	longitude: number;
	street: string;
}

export interface SetSearchResult {
	(result: SearchResult): void;
}
