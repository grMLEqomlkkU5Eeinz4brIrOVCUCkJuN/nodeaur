import BaseResult from "./BaseResult.js";
import PackageDetailed from "./PackageDetailed.js";

export default interface InfoResult extends BaseResult {
	results: PackageDetailed[];
}