const isParsableURL = (str: string) => {
	try {
		new URL(str);
		return true;
	} catch (err) {
		console.warn(`Failed to parse ${str}`, err);
		return false;
	}
};

export const isValidURL = (str: string) => {
	if (!str) return false;
	if (!isParsableURL(str)) return false;

	const res = str?.match(
		/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
	);
	if (res !== null) {
		const valid = str.includes("https://");
		return valid;
	}
	return res !== null;
};
