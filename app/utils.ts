import { SocialLogin } from "aa-conla-social-sdk";

export const social = new SocialLogin(
  "http://localhost:3000/oauth",
  "http://localhost:3000"
);
