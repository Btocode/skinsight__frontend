import { loginSchema } from "@/schema/auth";
import { authActions } from "@/utils/auth";
import { z } from "zod";

export type AuthActionType = (typeof authActions)[number];

export type LoginSchema = z.infer<typeof loginSchema>;
