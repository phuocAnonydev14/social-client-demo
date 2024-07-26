"use client";

import { social } from "@/app/utils";

export const SocialSdk = () => {
  return (
    <div style={{ display: "flex", gap: "50px" }}>
      <button
        onClick={() => {
          social.auth.loginGoogle();
        }}
      >
        Login sdk
      </button>

      <button
        onClick={() => {
          social.auth.logout();
        }}
      >
        sign out
      </button>
    </div>
  );
};
