export const toKebabCase = (value: string) => {
	return value
		.replace(/((?<=[a-z\d])[A-Z]|(?<=[A-Z\d])[A-Z](?=[a-z]))/g, "-$1")
		.toLowerCase();
};
