export { aurRequest, AUR_BASE_URL } from "./client.js";
export { searchSinglePackageTerm, packageNameSingleStartsWith, packageNameMultipleStartsWith } from "./services/packageSearch.js";
export { singlePackageInfo, multiplePackageInfo, multiplePackageInfoPost } from "./services/packageDetails.js";

export type { default as BaseResult } from "./types/BaseResult.js";
export type { default as ErrorResult } from "./types/ErrorResult.js";
export type { GenericRequestError } from "./types/GenericRequestError.js";
export type { default as InfoResult } from "./types/InfoResult.js";
export type { default as PackageBasic } from "./types/PackageBasic.js";
export type { default as PackageDetailed } from "./types/PackageDetailed.js";
export type { PackageName } from "./types/PackageNames.js";
export type { default as SearchResult } from "./types/SearchResult.js";
