"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { social } from "../utils";

export default function OauthPage() {
  const searchParams = useSearchParams();
  const codeParams = searchParams.get("code");
  const [token, setToken] = useState<any>("");
  const [email,setEmail] = useState<string>("");
  useEffect(() => {
    if (codeParams) {
      (async () => {
        try {
          const userRes = await social.user?.getInformation(codeParams);
          if (!userRes?.user.encryptionKey) {
            const privateKey = await social.user?.generatePrivateKey();
          }
          setToken({
            accessToken: userRes?.accessToken,
            idToken: userRes?.idToken,
          })
          setEmail(userRes?.user.email)
          const privateKey = await social.user?.getPrivateKey();
          console.log({ privateKey });
          console.log({ token });
        } catch (e) {}
      })();
    }
  },[codeParams]);

  return (
    <div>
      <p><strong>User email:</strong> {email}</p>
      <p style={{ marginBottom: "30px" }}>
        <strong>accessToken:{" "}</strong>
        <p style={{ wordBreak: "break-word" }}>{token?.accessToken}</p>
      </p>
      <p>
        <strong>idToken:</strong>
         <p style={{ wordBreak: "break-word" }}>{token?.idToken}</p>
      </p>
    </div>
  );
}
