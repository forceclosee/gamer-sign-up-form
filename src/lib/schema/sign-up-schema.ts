import { z } from "zod";

export const passwordRules = [
	{
		id: "length",
		label: "Use at least 8 characters",
		regex: null,
		test: (val: string) => val.length >= 8,
	},
	{
		id: "uppercase",
		label: "Use at least one uppercase letter",
		regex: /[A-Z]/,
		test: (val: string) => /[A-Z]/.test(val),
	},
	{
		id: "number",
		label: "Use at least one number",
		regex: /[0-9]/,
		test: (val: string) => /[0-9]/.test(val),
	},
	{
		id: "special",
		label: "Use at least one special character",
		regex: /[^a-zA-Z0-9]/,
		test: (val: string) => /[^a-zA-Z0-9]/.test(val),
	},
];

let passwordSchema = z.string();

for (const rule of passwordRules) {
	if (rule.id === "length") {
		passwordSchema = passwordSchema.min(8, rule.label);
	} else if (rule.regex) {
		passwordSchema = passwordSchema.regex(rule.regex, rule.label);
	}
}

export const signupSchema = z
	.object({
		signupCallsign: z
			.string()
			.min(1, "Enter a callsign")
			.min(3, "Use at least 3 characters")
			.max(20, "Use 20 characters or fewer")
			.regex(/^[a-zA-Z0-9_-]+$/, "Use letters, numbers, _ or - only"),
		signupEmail: z.email("Enter a valid email, like you@example.com"),
		signupPassword: passwordSchema,
		signupConfirmPassword: z.string().min(1, "Passwords don't match"),
		signupAcceptTerms: z
			.boolean()
			.refine((val) => val === true, "Accept the terms to continue"),
	})
	.refine((data) => data.signupPassword === data.signupConfirmPassword, {
		error: "Passwords don't match",
		path: ["signupConfirmPassword"],
	});

export type signupSchema = z.infer<typeof signupSchema>;
