"use client";

import { useState } from "react";
import {
  FileText,
  Activity,
  Home,
  ListTodo,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { CURRENT_USER, CURRENT_TEAM } from "@/lib/constants";
import Image from "next/image";
import { ItemInfo } from "./common/ItemInfo";

type SidebarItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

const SIDEBAR_ITEMS: SidebarItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Tasks", href: "/tasks", icon: ListTodo },
  { name: "Activity", href: "/activity", icon: Activity },
  { name: "Reports", href: "/reports", icon: FileText },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => {
    if (route === "/") {
      return pathname === "/";
    }

    return pathname === route || pathname.startsWith(`${route}/`);
  };

  const sidebarContent = (
    <>
      <div className="px-4 py-5">
        {/* Team header */}
        <div className="mb-5 flex items-start justify-between gap-1.5 px-1 border-b border-[#E4E4E7] pb-5">
          <div className="flex items-center gap-1.5">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
              <Image
                src="/images/logo.avif"
                alt="Veelion logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col items-start px-1">
              <p className="font-semibold">{CURRENT_TEAM.name}</p>
              <p className="text-xs text-[#A1A1AA]">{CURRENT_TEAM.email}</p>
            </div>
          </div>
          {/* Close — mobile only */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <div className="space-y-5 mt-10">
          <section className="space-y-2">
            <p className="px-2 text-[10px] font-bold uppercase text-[#A1A1AA]">
              General
            </p>
            <ul className="space-y-1.5">
              {SIDEBAR_ITEMS.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        router.push(item.href);
                      }}
                      className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer
                        ${
                          isActive(item.href)
                            ? "bg-primary text-white hover:bg-primary-600"
                            : "text-zinc-700 hover:bg-primary-100 hover:text-primary-700"
                        }`}
                    >
                      <Icon className="h-6 w-6" />
                      <span>{item.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>

      {/* User button */}
      <div className="mt-auto border-t border-[#E4E4E7]">
        <ItemInfo
          badge={{ variant: "user" }}
          title={CURRENT_USER.name}
          subtitle={CURRENT_USER.email}
        />
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-[#E4E4E7] bg-white text-zinc-900 md:sticky md:top-0 md:flex">
        {sidebarContent}
      </aside>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-40 flex items-center justify-center rounded-xl border border-[#E4E4E7] bg-white p-2 text-zinc-500 shadow-sm md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-[#E4E4E7] bg-white text-zinc-900 shadow-xl transition-transform duration-300 ease-in-out md:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
