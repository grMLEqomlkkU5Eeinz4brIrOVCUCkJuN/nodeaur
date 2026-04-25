import { singlePackageInfo, multiplePackageInfo, multiplePackageInfoPost } from "../src/index.js";
import { GenericRequestError } from "../src/types/GenericRequestError.js";

describe("singlePackageInfo", () => {
	test("returns detailed info for a known package", async () => {
		const result = await singlePackageInfo("yay");
		expect(result.type).toBe("multiinfo");
		expect((result as any).resultcount).toBe(1);
		expect(result.results).toHaveLength(1);

		const pkg = result.results[0];
		expect(pkg.Name).toBe("yay");
		expect(pkg).toHaveProperty("ID");
		expect(pkg).toHaveProperty("Version");
		expect(pkg).toHaveProperty("Description");
		expect(pkg).toHaveProperty("Maintainer");
		expect(pkg).toHaveProperty("Submitter");
		expect(pkg).toHaveProperty("License");
		expect(pkg).toHaveProperty("Depends");
		expect(pkg).toHaveProperty("MakeDepends");
		expect(pkg).toHaveProperty("Keywords");
	});

	test("returns zero results for a nonexistent package", async () => {
		const result = await singlePackageInfo("zzzznotarealpackagezzz");
		expect((result as any).resultcount).toBe(0);
		expect(result.results).toHaveLength(0);
	});
});

describe("multiplePackageInfo", () => {
	test("returns info for multiple packages via GET", async () => {
		const result = await multiplePackageInfo({ "arg[]": "yay" });
		expect(result).toHaveProperty("results");
		expect((result as any).resultcount).toBeGreaterThanOrEqual(1);
	});

	test("throws GenericRequestError for invalid parameters", async () => {
		await expect(multiplePackageInfo({})).rejects.toThrow(GenericRequestError);
	});
});

describe("multiplePackageInfoPost", () => {
	test("returns info for a package via POST", async () => {
		const result = await multiplePackageInfoPost({ "arg[]": "yay" });
		expect(result).toHaveProperty("results");
		expect((result as any).resultcount).toBeGreaterThanOrEqual(1);
	});

	test("throws GenericRequestError for invalid parameters", async () => {
		await expect(multiplePackageInfoPost({})).rejects.toThrow(GenericRequestError);
	});
});
