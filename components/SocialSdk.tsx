"use client"

import { social } from "@/app/layout";
import {
  KMSClient,
  ListAliasesCommand,
  GenerateDataKeyCommand,
  EncryptCommand,
  DecryptCommand,
} from "@aws-sdk/client-kms";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { useState } from "react";

export const SocialSdk = () => {

  return (
    <div style={{ display: "flex", gap: "50px" }}>
      <button
        onClick={() => {
          social.auth.loginGoogle("http://localhost:3000/oauth");
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
