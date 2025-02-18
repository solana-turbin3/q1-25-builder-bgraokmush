"use client";

import { Spinner } from "@radix-ui/themes";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { publicKey, connected, connecting } = useWallet();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && !publicKey) {
      router.push(`/`);
    }
  }, [publicKey, router, pathname]);

  if (connecting) {
    return (
      <div className="w-full h-screen flex flex-col gap-2 justify-center items-center">
        <Spinner size="3" loading={true} />
      </div>
    );
  }

  return publicKey ? <>{children}</> : null;
};

export default ProtectedLayout;
