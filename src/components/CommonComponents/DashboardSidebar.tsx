/** @format */
"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  useSidebar,
} from "../ui/sidebar";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase } from "lucide-react";
import NavItem from "./NavItem";

export default function DashboardSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();

  const isCollapsed = state === "collapsed";

  const navItems = [
    {
      href: "/products",
      icon: Briefcase,
      label: "Products",
    },
  ];
  if (pathname == "/") return null;

  return (
    <>
      <Sidebar
        className={`shadow-none  py-4  bg-background border-r border-none ${isCollapsed ? "px-1" : "px-4"}`}
        collapsible="icon"
      >
        <SidebarContent
          className={`bg-background  border-t-2 border-l-2 border-r-2 border-border shadow-neutral-600 rounded-t-4xl
                      ${isCollapsed ? "px-0.5" : "px-2"}`}
        >
          <div
            className={`mb-6  flex  items-center justify-center rounded-md   ${
              isCollapsed
                ? " flex items-center w-full justify-center mx-auto p-1 "
                : "gap-2"
            }`}
          >
            {/* This is the logo section of the sidebar */}
            <Link href="/" className="flex gap-2 ">
              {isCollapsed ? (
                <Image
                  src="/roxnor-icon.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
              ) : (
                <div className="mt-2 flex items-center gap-2 h-10 ">
                  <Image
                    src="/roxnor-logo.png"
                    alt="Logo"
                    width={120}
                    height={120}
                    className="w-40 h-10"
                    priority
                  />
                </div>
              )}
            </Link>
          </div>
          {/* This is the menu section */}
          <SidebarMenu
            className={
              isCollapsed ? "px-2 space-y-1 items-center" : "md:px-1 space-y-1"
            }
          >
            {navItems.map((item) => (
              //Called the menu component here
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                active={
                  !!(
                    pathname === item.href ||
                    pathname?.startsWith(item.href + "/")
                  )
                }
                collapsed={isCollapsed}
              />
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="pb-16 bg-background rounded-b-4xl border-r-2 border-b-2 border-l-2 border-border shadow-neutral-600">
          {/* Footer content can go here if needed */}
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
