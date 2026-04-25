import { aurRequest } from "../client.js";
import type InfoResult from "../types/InfoResult.js";

export const singlePackageInfo = async (packageName: string): Promise<InfoResult> => {
	return await aurRequest<InfoResult>("/info", packageName);
}

export const multiplePackageInfo = async (params: Record<string, string>): Promise<InfoResult[]> => {
	return await aurRequest<InfoResult[]>("/info", undefined, params);
}

export const multiplePackageInfoPost = async (params: Record<string, string>): Promise<InfoResult[]> => {
	return await aurRequest<InfoResult[]>("/info", undefined, params, "POST");
}