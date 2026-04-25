import ErrorResult from "./types/ErrorResult.js";
import { GenericRequestError } from "./types/GenericRequestError.js";

export const AUR_BASE_URL = "https://aur.archlinux.org/rpc/v5";

export const aurRequest = async <T>(endpoint: string, path?: string, params?: Record<string, string>, requestType: string = 'GET'): Promise<T> => {
	const requestUrl = new URL(`${AUR_BASE_URL}${endpoint}`);

	let body: URLSearchParams | undefined;
	if (params) {
		if (requestType === 'POST') {
			body = new URLSearchParams();
			Object.entries(params).forEach(([key, value]) => {
				body!.append(key, value);
			});
		} else {
			Object.entries(params).forEach(([key, value]) => {
				requestUrl.searchParams.append(key, value);
			});
		}
	}

	if (path) requestUrl.pathname += `/${path}`;

	try {
		const response = await fetch(requestUrl.toString(), {
			method: requestType,
			headers: {
				'Accept': 'application/json'
			},
			body
		});

		const data = await response.json() as T | ErrorResult;

		if (!response.ok || (data && typeof data === "object" && "error" in data)) {
			throw new Error(`AUR API error: ${response.status}`);
		}

		return data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new GenericRequestError(endpoint, undefined, error.message);
		}
		throw new GenericRequestError(endpoint);
	}
};
