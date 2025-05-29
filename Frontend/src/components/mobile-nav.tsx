"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import Image from "next/image";
import IconChat from "@/components/icons/bubble.svg";
import IconChatFill from "@/components/icons/bubble.svg";
import IconProfile from "@/components/icons/person.svg";
import IconProfileFill from "@/components/icons/personFill.svg";
import { usePathname } from "next/navigation";

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
				className="inline-flex items-center justify-center p-2 text-muted-foreground hover:text-foreground md:hidden"
				aria-label="Open sidebar"
				onClick={() => setOpen(true)}
				type="button"
			>
				<Menu className="size-6" />
			</button>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent side="left" className="p-0 w-[256px]">
					<div className="flex w-full px-3 py-2">
						<Image
							src="/logo-with-text.svg"
							height={40}
							width={84}
							alt="logo"
						/>
					</div>
					<div className="h-6" />
					<nav className="flex flex-col gap-0.5">
						{navLinks.map((link) => {
							const isActive = pathname === link.href;
							const IconComponent = isActive ? link.iconFill : link.icon;
							return (
								<Link
									key={link.href}
									href={link.href}
									className={`flex items-center gap-3 rounded-[12px] px-3 py-3 leading-[24px] font-medium transition-colors ${
										isActive
											? "bg-muted text-foreground"
											: "text-muted-foreground hover:bg-muted hover:text-foreground"
									}`}
									aria-current={isActive ? "page" : undefined}
									onClick={() => setOpen(false)}
								>
									<span className="p-0.5 text-[20px]">
										{IconComponent && <IconComponent />}
									</span>
									<p>{link.label}</p>
								</Link>
							);
						})}
					</nav>
				</SheetContent>
			</Sheet>
		</>
	);
}
