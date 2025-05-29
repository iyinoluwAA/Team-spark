"use client";

import { useRouter, usePathname } from "next/navigation";
import IconChevronLeft from "@/components/icons/chevron-left.svg";
import { Menu } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";

interface AppHeaderProps {
	title?: string;
	link?: string;
	onToggleSidebar?: () => void;
}

const STATIC_PAGES: Record<string, string> = {
	"/": "Home",
	"/explore": "Explore",
	"/debug": "Debug",
};

const getTitleForPath = (pathname: string): string => {
	if (pathname.includes("/settings")) return "Settings";
	if (STATIC_PAGES[pathname]) return STATIC_PAGES[pathname];
	const cleanPath = pathname.startsWith("/") ? pathname.slice(1) : pathname;
	if (cleanPath === "profile") return "Profile";
	if (/^[a-zA-Z0-9_]+$/.test(cleanPath)) return `@${cleanPath}`;
	return cleanPath.charAt(0).toUpperCase() + cleanPath.slice(1);
};

export function AppHeader({ onToggleSidebar }: AppHeaderProps) {
	const router = useRouter();
	const pathname = usePathname();
	const title = getTitleForPath(pathname);
	const isStaticPage = !!STATIC_PAGES[pathname];

	return (
		<div className="relative flex h-[56px] w-full flex-none items-center justify-center">
			<span className="absolute left-4 flex items-center">
				<MobileNav />
			</span>
			<p className="text-[18px] leading-[24px] font-medium capitalize">
				{title}
			</p>
		</div>
	);
}
