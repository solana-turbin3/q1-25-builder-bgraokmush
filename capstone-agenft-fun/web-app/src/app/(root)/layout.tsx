"use client";

import { Sidebar } from "@/components/ui/Sidebar";
import { cx } from "@/lib/utils";
import { Spinner } from "@radix-ui/themes";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const { publicKey, connecting } = useWallet();
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

  return publicKey ? (
    <div className="mx-auto max-w-full h-screen">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <main
        className={cx(
          isCollapsed ? "lg:pl-[60px]" : "lg:pl-64",
          "ease transform-gpu transition-all duration-100 will-change-transform  lg:py-3 lg:pr-3 "
        )}
      >
        <div className="p-4 sm:p-6">{children}</div>
      </main>
    </div>
  ) : null;
};

export default ProtectedLayout;
