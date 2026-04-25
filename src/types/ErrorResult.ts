import BaseResult from "./BaseResult.js";

export default interface ErrorResult extends BaseResult {
	error: string;
	results: [];
}