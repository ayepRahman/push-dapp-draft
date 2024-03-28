// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isAlphanumeric = (str: any) => /[^a-zA-Z0-9]/.test(str);
