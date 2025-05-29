"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import IconChat from "@/components/icons/bubble.svg";
import IconChatFill from "@/components/icons/bubble.svg";
import IconProfile from "@/components/icons/person.svg";
import IconProfileFill from "@/components/icons/personFill.svg";

export function Sidebar() {
  const pathname = usePathname();

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

  return (
    <div className="hidden h-full w-[256px] flex-none flex-col items-center gap-3 bg-background px-3 pt-4 pb-6 shadow-[inset_-1px_0px_0px_0px_var(--border)] md:flex">
      <div className="flex w-full px-3 py-2">
        <Image src="/logo-with-text.svg" height={40} width={84} alt="logo" />
      </div>

      <div className="flex w-full flex-col gap-0.5">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const IconComponent = isActive ? link.iconFill : link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-[12px] px-3 py-3 font-medium leading-[24px] transition-colors ${
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="p-0.5 text-[20px]">{IconComponent && <IconComponent />}</span>
              <p>{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto flex items-center gap-2 text-[13px] text-muted-foreground leading-[16px]">
        <p>© 2025 EmotiChat</p>
        <p className="text-muted-foreground">·</p>
        <Link
          href="https://github.com/iyinoluwAA/Team-spark"
          target="_blank"
          className="transition-colors hover:text-foreground"
        >
          GitHub
        </Link>
      </div>
    </div>
  );
}
