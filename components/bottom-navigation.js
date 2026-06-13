"use client";

import {
  Headphones,
  House,
  BookOpen,
  Bookmark,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNavigation = () => {
  const pathname = usePathname();
  const navigation = [
    {
      name: "Beranda",
      href: "/",
      icon: House,
    },
    {
      name: "Surah",
      href: "/alquran/surah",
      icon: BookOpen,
    },
    {
      name: "Juz",
      href: "/alquran/juz",
      icon: LayoutGrid,
    },
    {
      name: "Murotal",
      href: "/alquran/murotal",
      icon: Headphones,
    },
    {
      name: "Tandaan",
      href: "/alquran/marks",
      icon: Bookmark,
    },
  ];

  return (
    <>
      <div className="h-24" aria-hidden="true" />
      <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[520px] -translate-x-1/2 px-3 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-2">
        <nav className="soft-card mx-auto flex max-w-md justify-around rounded-[26px] p-1.5">
        {navigation.map(({ name, href, icon: Icon }) => {
          const isActive =
            pathname === href ||
            (href === "/alquran/surah" && pathname.startsWith("/alquran/surah/"));
          return (
            <Link
              key={name}
              href={href}
              className={`flex min-w-14 flex-col items-center gap-1 rounded-[20px] px-2 py-2 transition ${
                isActive
                  ? "bg-[#0f6b56] text-white shadow-[0_8px_22px_rgba(15,107,86,.24)]"
                  : "text-[#718078] hover:bg-[#edf4f0] hover:text-[#0f6b56]"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
              <span className="text-[10px] font-semibold">{name}</span>
            </Link>
          );
        })}
        </nav>
      </div>
    </>
  );
};

export default BottomNavigation;
