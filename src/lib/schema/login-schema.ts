import z from "zod";

export const loginSchema = z.object({
	loginCallsignOrEmail: z.string().min(1, "Callsign or email is required"),
	loginPassword: z.string().min(1, "Password is required"),
});
