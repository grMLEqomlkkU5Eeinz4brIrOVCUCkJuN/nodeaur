import BaseResult from "./BaseResult.js";
import PackageBasic from "./PackageBasic.js";

export default interface SearchResult extends BaseResult {
	results: PackageBasic[];
}