/**
 * Truncates a string to a maximum length and appends an ellipsis if truncated.
 *
 * @param str - The string to truncate
 * @returns The truncated string or the original string if not truncated
 */
export function truncate(str: string): string {
	if (str.length > 8) {
		return `${str.substring(0, 4)}...${str.substring(str.length - 4)}`;
	}
	return str;
}
