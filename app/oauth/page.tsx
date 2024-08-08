"use client";
import { ReloadIcon } from "@radix-ui/react-icons";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { social } from "../utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function OauthPage() {
  const searchParams = useSearchParams();
  const codeParams = searchParams.get("code");
  const [token, setToken] = useState<any>("");
  const [email, setEmail] = useState<string>("");
  const [user, setUser] = useState<any>();
  const [privateKey, setPrivateKey] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleGeneratePrivateKey = async () => {
    try {
      const privateKey = await social.user?.generatePrivateKey();
      setPrivateKey(privateKey || "");
      setIsShowModal(false);
      setGenerating(true);
    } catch (e: any) {
      console.log(e);
      toast(e?.message || "User is already signed in", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleFetchUser = async (codeParams: string) => {
    try {
      console.log("come here");
      const userRes = await social.user?.getInformation(codeParams);
      if (!userRes?.user.encryptionKey) {
        setIsShowModal(true);
      }

      setToken({
        accessToken: userRes?.accessToken,
        idToken: userRes?.idToken,
      });
      setEmail(userRes?.user.email);
      const privateKey = await social.user?.getPrivateKey();

      setUser(userRes?.user);
      setPrivateKey(privateKey || "");
      console.log({ privateKey });
      console.log({ token });
    } catch (e) {}
  };

  useEffect(() => {
    if (codeParams) {
      handleFetchUser(codeParams);
    }
  }, [codeParams]);

  console.log(user);

  return (
    <div>
      <p>
        <strong>User email:</strong> {email}
      </p>
      <p style={{ marginBottom: "30px" }}>
        <strong>Your private key: </strong>
        <p style={{ wordBreak: "break-word" }}>{privateKey}</p>
      </p>
      <p style={{ marginBottom: "30px" }}>
        <strong>Your id token: </strong>
        <p style={{ wordBreak: "break-word" }}>{token?.idToken}</p>
      </p>
      <Dialog open={isShowModal} onOpenChange={setIsShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Your account didn&apos;t have private key
            </DialogTitle>
            <DialogDescription>
              <div className="flex flex-col justify-center items-center gap-4">
                Generate private key
                <Button
                  disabled={generating}
                  onClick={handleGeneratePrivateKey}
                >
                  {generating && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Generate
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
