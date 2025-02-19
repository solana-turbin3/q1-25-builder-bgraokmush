import { siteConfig } from "@/app/siteConfig";
import { Button } from "@/components/ui/Buttton";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/Drawer";
import { cx, focusRing } from "@/lib/utils";

import { Compass, Menu, MessageCircle, UserCog } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const navigation = [
  { name: "Chat", href: siteConfig.baseLinks.chat, icon: MessageCircle },
  {
    name: "Profile",
    href: siteConfig.baseLinks.profile,
    icon: UserCog,
  },
] as const;

export default function MobileSidebar() {
  const pathname = usePathname();
  const isActive = (itemHref: string) => {
    return pathname === itemHref || pathname.startsWith(itemHref);
  };

  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            aria-label="open sidebar"
            className="group flex items-center rounded-md p-1.5 text-sm font-medium hover:bg-gray-100 data-[state=open]:bg-gray-100 data-[state=open]:bg-gray-400/10 hover:dark:bg-gray-400/10"
          >
            <Menu
              className="size-6 shrink-0 text-gray-600 dark:text-gray-400"
              aria-hidden="true"
            />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="sm:max-w-lg">
          <DrawerHeader>
            <DrawerTitle>
              Age<span className="text-purple-600 font-bold">NFT</span>.fun
            </DrawerTitle>
          </DrawerHeader>
          <DrawerBody className="flex flex-col items-stretch w-full">
            <nav
              aria-label="core mobile navigation links"
              className="flex flex-1 flex-col space-y-10"
            >
              <div>
                <span
                  className={cx(
                    "block h-6 text-xs font-medium leading-6 text-gray-500 transition-opacity dark:text-gray-400"
                  )}
                >
                  Platform
                </span>
                <ul role="list" className="mt-1 space-y-1.5">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <DrawerClose asChild>
                        <Link
                          href={item.href}
                          className={cx(
                            isActive(item.href)
                              ? "text-purple-600 dark:text-purple-500"
                              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                            "flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-base font-medium transition hover:bg-gray-100 sm:text-sm hover:dark:bg-gray-900",
                            focusRing
                          )}
                        >
                          <item.icon
                            className="size-5 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </DrawerClose>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span
                  className={cx(
                    "block h-6 text-xs font-medium leading-6 text-gray-500 transition-opacity dark:text-gray-400"
                  )}
                >
                  Setup
                </span>
                <ul role="list" className="mt-1 space-y-1.5">
                  <li>
                    <Link
                      href="/onboarding/products"
                      className={cx(
                        isActive("/onboarding")
                          ? "text-purple-600 dark:text-purple-500"
                          : "text-gray-600 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                        "flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-base font-medium transition hover:bg-gray-100 sm:text-sm hover:dark:bg-gray-900",
                        focusRing
                      )}
                    >
                      <Compass className="size-5 shrink-0" aria-hidden="true" />
                      Create
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="mt-auto border-t border-gray-200 pt-3 dark:border-gray-800">
              <WalletMultiButtonDynamic
                style={{
                  backgroundColor: "#9333ea",
                  padding: "0px 10px",
                  margin: "0px",
                  borderRadius: "2px",
                  fontSize: "16px",
                  fontWeight: "initial",
                  width: "100%",
                  textAlign: "center",
                  textAlignLast: "center",
                }}
              />
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
