"use client";

import IconChat from "@/components/icons/bubble.svg";
import IconChatFill from "@/components/icons/bubble.svg";
import IconProfile from "@/components/icons/person.svg";
import IconProfileFill from "@/components/icons/personFill.svg";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  {
    href: "/chat",
    label: "Chat",
    icon: IconChat,
    iconFill: IconChatFill,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: IconProfile,
    iconFill: IconProfileFill,
  },
];

export function MobileNav() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (!isMobile) return null;

  return (
    <>
      <button
        className="inline-flex items-center justify-center p-2 text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 md:hidden"
        aria-label="Open sidebar"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Menu className="size-6" />
      </button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="flex w-22 flex-col items-center p-0 bg-white dark:bg-gray-900"
        >
          <div className="mt-6 mb-6 flex flex-col items-center">
            <Image src="/logo.svg" height={40} width={40} alt="logo" />
          </div>
          <nav className="flex w-full flex-col items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const IconComponent = isActive ? link.iconFill : link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex w-16 flex-col items-center gap-1 rounded-xl px-0 py-3 transition-colors ${
                    isActive
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                      : "text-muted-foreground hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-300"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="flex items-center justify-center text-[22px]">
                    {IconComponent && <IconComponent />}
                  </span>
                  <span className="font-medium text-xs leading-tight">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
