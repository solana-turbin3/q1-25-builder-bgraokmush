"use client";

import { siteConfig } from "@/app/siteConfig";
import useScroll from "@/lib/useScroll";
import { cx } from "@/lib/utils";
import { RiCloseFill, RiMenuFill } from "@remixicon/react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/Buttton";
import dynamic from "next/dynamic";

export function NavBar() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(15);

  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );

  return (
    <header
      className={cx(
        "fixed inset-x-4 top-4 z-50 mx-auto flex max-w-6xl justify-center border border-transparent px-3 py-3 transition duration-300",
        scrolled || open
          ? "dark:border-gray-800 dark:bg-black border-gray-200/50 bg-white/80 shadow-2xl shadow-black/5 backdrop-blur-sm"
          : "bg-white/0"
      )}
    >
      <div className="w-full md:my-auto">
        <div className="relative flex items-center justify-between">
          <Link href={siteConfig.baseLinks.home} aria-label="Home">
            <span className="text-white text-xl">
              Age<span className="text-purple-600 font-bold">NFT</span>.fun
            </span>
          </Link>
          <nav className="hidden sm:block md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:transform">
            <div className="flex items-center gap-10 font-medium">
              <Link className="px-2 py-1" href="#solutions">
                Product
              </Link>
              <Link className="px-2 py-1" href="#farm-management">
                Buy NFT
              </Link>
              <Link className="px-2 py-1" href="#solar-analytics">
                About Us
              </Link>
            </div>
          </nav>
          <div className="hidden sm:block">
            <WalletMultiButtonDynamic
              style={{
                backgroundColor: "#9333ea",
                padding: "0px 10px",
                margin: "0px 5px",
                borderRadius: "0px",
                fontSize: "16px",
                fontWeight: "initial",
              }}
            />
          </div>
          <Button
            onClick={() => setOpen(!open)}
            variant="primary"
            className="p-1.5 sm:hidden"
            aria-label={open ? "CloseNavigation Menu" : "Open Navigation Menu"}
          >
            {!open ? (
              <RiMenuFill className="size-6 shrink-0" aria-hidden />
            ) : (
              <RiCloseFill
                className="size-6 shrink-0 text-gray-900"
                aria-hidden
              />
            )}
          </Button>
        </div>
        <nav
          className={cx(
            "mt-6 flex flex-col gap-6 text-lg ease-in-out will-change-transform sm:hidden",
            open ? "" : "hidden"
          )}
        >
          <ul className="space-y-4 font-medium">
            <li onClick={() => setOpen(false)}>
              <Link href="#solutions">Product</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link href="#farm-management">Buy NFT</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link href="#solar-analytics">About Us</Link>
            </li>
          </ul>

          <WalletMultiButtonDynamic
            style={{
              backgroundColor: "#9333ea",
              padding: "0px 10px",
              margin: "0px",
              borderRadius: "0px",
              fontSize: "16px",
              fontWeight: "initial",
              width: "100%",
              textAlign: "center",
              textAlignLast: "center",
            }}
          />
        </nav>
      </div>
    </header>
  );
}
