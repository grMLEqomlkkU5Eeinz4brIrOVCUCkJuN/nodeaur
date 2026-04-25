import { aurRequest } from "../client.js";
import type SearchResult from "../types/SearchResult.js";
import type { PackageName } from "../types/PackageNames.js";

export const searchSinglePackageTerm = async (searchTerm: string): Promise<SearchResult> => {
	return await aurRequest<SearchResult>("/search", searchTerm);
}

export const packageNameSingleStartsWith = async (startsWith: string): Promise<PackageName[]> => {
	return await aurRequest<PackageName[]>("/suggest", startsWith);
}

export const packageNameMultipleStartsWith = async (startsWith: string): Promise<PackageName[]> => {
	return await aurRequest<PackageName[]>("/suggest-pkgbase", startsWith);
}
