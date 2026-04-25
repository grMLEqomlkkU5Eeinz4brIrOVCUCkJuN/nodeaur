import { packageNameSingleStartsWith, searchSinglePackageTerm, packageNameMultipleStartsWith } from "../src/index.js";
import { GenericRequestError } from "../src/types/GenericRequestError.js";

describe("packageNameSingleStartsWith", () => {
	test("returns package names that start with the given prefix", async () => {
		const result = await packageNameSingleStartsWith("gtk");
		expect(Array.isArray(result)).toBe(true);
		expect(result.length).toBeGreaterThan(0);
		expect(result.every(name => name.startsWith("gtk"))).toBe(true);
	});

	test("returns an empty array for a nonsensical prefix", async () => {
		const result = await packageNameSingleStartsWith("zzzznotarealpackagezzz");
		expect(Array.isArray(result)).toBe(true);
		expect(result).toHaveLength(0);
	});

	test("returns results for a single-character prefix", async () => {
		const result = await packageNameSingleStartsWith("a");
		expect(Array.isArray(result)).toBe(true);
		expect(result.length).toBeGreaterThan(0);
	});
});

describe("packageNameMultipleStartsWith", () => {
	test("returns package base names that start with the given prefix", async () => {
		const result = await packageNameMultipleStartsWith("gtk");
		expect(Array.isArray(result)).toBe(true);
		expect(result.length).toBeGreaterThan(0);
		expect(result.every(name => name.startsWith("gtk"))).toBe(true);
	});

	test("returns an empty array for a nonsensical prefix", async () => {
		const result = await packageNameMultipleStartsWith("zzzznotarealpackagezzz");
		expect(Array.isArray(result)).toBe(true);
		expect(result).toHaveLength(0);
	});
});

describe("searchSinglePackageTerm", () => {
	test("returns search results with expected structure", async () => {
		const result = await searchSinglePackageTerm("neovim");
		expect(result.type).toBe("search");
		expect((result as any).resultcount).toBeGreaterThan(0);
		expect(result.results.length).toBe((result as any).resultcount);
	});

	test("each result contains required package fields", async () => {
		const result = await searchSinglePackageTerm("neovim");
		const pkg = result.results[0];
		expect(pkg).toHaveProperty("ID");
		expect(pkg).toHaveProperty("Name");
		expect(pkg).toHaveProperty("Version");
		expect(pkg).toHaveProperty("PackageBase");
		expect(pkg).toHaveProperty("NumVotes");
		expect(pkg).toHaveProperty("Popularity");
	});

	test("returns zero results for a nonsensical search term", async () => {
		const result = await searchSinglePackageTerm("zzzznotarealpackagezzz");
		expect(result.type).toBe("search");
		expect((result as any).resultcount).toBe(0);
		expect(result.results).toHaveLength(0);
	});

	test("throws GenericRequestError for a search term that is too short", async () => {
		await expect(searchSinglePackageTerm("a")).rejects.toThrow(GenericRequestError);
	});
});
