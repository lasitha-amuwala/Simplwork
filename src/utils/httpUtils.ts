export const createURL = (endpoint: string, params?: any) => {
	const query = new URLSearchParams({ ...params });
	query.forEach((val, key) => {
		if (val == '' || val == 'undefined') query.delete(key);
	});
	return `${endpoint}?${query}`;
};
