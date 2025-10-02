"use client";

import {
  BookHeadphones,
  BookOpen,
  Bookmark,
  TableProperties,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNavigation = () => {
  const pathname = usePathname();
  const navigation = [
    {
      name: "Surah",
      href: "/alquran/surah",
      icon: BookOpen,
    },
    {
      name: "Juz",
      href: "/alquran/juz",
      icon: TableProperties,
    },
    {
      name: "Murotal",
      href: "/alquran/murotal",
      icon: BookHeadphones,
    },
    {
      name: "Tandaan",
      href: "/alquran/marks",
      icon: Bookmark,
    },
  ];

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 z-50">
      <div className="flex justify-around max-w-md mx-auto">
        {navigation.map(({ name, href, icon: Icon }) => {
          return (
            <Link
              key={name}
              href={href}
              className="flex flex-col items-center gap-1 p-2"
            >
              <Icon
                size={24}
                className={
                  pathname === href ? "text-emerald-600" : "text-gray-600"
                }
              />
              <span
                className={
                  pathname === href
                    ? "text-xs text-emerald-600"
                    : "text-xs text-gray-600"
                }
              >
                {name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
