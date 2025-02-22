const authActions = [
  "sign-in",
  "sign-up",
  "forgot-password",
  "code-validation",
  "set-new-password",
] as const;

/**
 * The type of authentication action.
 */
export type AuthAction = (typeof authActions)[number];

export { authActions };
