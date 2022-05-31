export const setLocalItem = (key: string, value: unknown) => {
	if (window) {
		const finalValue = JSON.stringify(value);

		localStorage.setItem(key, finalValue as string);
	}
};

export const getLocalItem = (key: string) => {
	if (window) {
		const value = localStorage.getItem(key);
		if (!value) {
			return null;
		}
		return JSON.parse(value);
	}
};
