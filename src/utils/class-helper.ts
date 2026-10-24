import { twMerge } from "tailwind-merge";

type ClassValue =
	| string
	| number
	| boolean
	| undefined
	| null
	| Record<string, unknown>
	| ClassValue[];

export function classList(...inputs: ClassValue[]): string {
	const classes: string[] = [];

	for (const input of inputs) {
		if (!input) continue;

		if (typeof input === "string" || typeof input === "number") {
			classes.push(String(input));
		} else if (Array.isArray(input)) {
			const inner = classList(...input);
			if (inner) classes.push(inner);
		} else if (typeof input === "object") {
			for (const key in input) {
				if (Object.hasOwn(input, key) && input[key]) {
					classes.push(key);
				}
			}
		}
	}

	return classes.join(" ");
}

export function cn(...inputs: ClassValue[]): string {
	return twMerge(classList(inputs));
}
