"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { DecryptCommand, EncryptCommand, KMSClient } from "@aws-sdk/client-kms";
import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";
import { social } from "../utils";

export default function OauthPage() {
  const searchParams = useSearchParams();
  const codeParams = searchParams.get("code");
  const REGION = "ap-southeast-2";
  const [token, setToken] = useState<any>("");

  useEffect(() => {
    if (codeParams) {
      (async () => {
        try {
          const token = await social.user?.getInformation(codeParams);
          if (!token?.user.encryptionKey) {
            const privateKey = await social.user?.generatePrivateKey();
            console.log({ privateKey });
          }
          console.log({ token });
        } catch (e) {}
      })();
    }
  });

  return (
    <div>
      <p style={{ marginBottom: "30px" }}>
        accessToken:{" "}
        <p style={{ wordBreak: "break-word" }}>{token?.accessToken}</p>
      </p>
      <p>
        idToken: <p style={{ wordBreak: "break-word" }}>{token?.idToken}</p>
      </p>
    </div>
  );
}
