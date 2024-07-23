"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {social} from "../layout";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { DecryptCommand, EncryptCommand, KMSClient } from "@aws-sdk/client-kms";
import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";

export default function OauthPage() {
  const searchParams = useSearchParams();
  const codeParams = searchParams.get("code");
  const REGION = "ap-southeast-2";
  const [token, setToken] = useState<any>("");

  const encryptPrivateKey = async (client: any) => {
    try {
      // const client = new KMSClient({
      const params = {
        /** input parameters */
      };
      const command = new EncryptCommand({
        KeyId: "56508abf-4b67-45f8-9cd8-884f1140e169",
        Plaintext: Buffer.from("phuoc origin", "utf8") as any,
      });

      const response = await client.send(command);
      console.log("hash", response);
      console.log("blob", response.CiphertextBlob);
      const params2 = {
        CiphertextBlob: response.CiphertextBlob!,
      };
      const data = await client.send(new DecryptCommand(params2));
      console.log("Decrypted plaintext:", data.Plaintext?.toString("utf8"));

      return response.CiphertextBlob;
    } catch (e) {
      console.log(e);
    }
  };

  const getCredentials = async (idToken: string) => {
    const IDENTITY_POOL_ID =
      "ap-southeast-2:75ae3f55-1584-4dbe-91ae-10cad1638f4f";
    return fromCognitoIdentityPool({
      clientConfig: { region: REGION },
      identityPoolId: IDENTITY_POOL_ID,
      logins: {
        [`cognito-idp.${REGION}.amazonaws.com/ap-southeast-2_vuy3yGPHT`]:
          idToken,
      },
    });
  };

  const verifyIdentity = async (credentialsProvider: any) => {
    const stsClient = new STSClient({
      region: REGION,
      credentials: credentialsProvider,
    });

    try {
      const command = new GetCallerIdentityCommand({});
      const response = await stsClient.send(command);
      console.log("Caller Identity:", response);
      return response;
    } catch (error) {
      console.error("Error verifying identity:", error);
    }
  };

  useEffect(() => {
    console.log("cos code", codeParams);

    if (codeParams) {
      console.log("cos code ne", codeParams);

      (async () => {
        try {
          const res = await social.auth.getTokens();
          console.log({ res: res?.tokens?.accessToken?.toString() });
          setToken({
            accessToken: res?.tokens?.accessToken?.toString(),
            idToken: res?.tokens?.idToken?.toString(),
          });

          const credientals = await getCredentials(
            res?.tokens?.accessToken?.toString() || ""
          );
          const client = new KMSClient({
            region: "ap-southeast-2",
            credentials: credientals,
          });
          console.log("credientals", client);
          const response = await verifyIdentity(credientals);
          console.log({ response });
          await encryptPrivateKey(client);
        } catch (e) {
          console.log({ e });
        }
      })();
    }
  }, [codeParams]);

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
