import { SocialAuth } from "aa-conla-social-sdk";

export const social = new SocialAuth({
  redirectSignIn: "https://social-client-demo.vercel.app/oauth",
  redirectSignOut: "https://social-client-demo.vercel.app",
});
