"use client";

import LogoutButton from "@/app/_features/sign-out/ui/logout-button";
import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import SidebarItem from "../../sidebar-item/sidebar-item";
import { sidebarItems } from "../const/regular-sidebar-items";

export default function RegularSidebar({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="md:pl-56 fixed z-40 border-b bg-white shadow-sm w-full flex items-center h-16">
        <div className="px-6 flex items-center justify-between w-full">
          {/* Burger Menu */}
          <div className="block md:hidden" onClick={toggleSidebar}>
            <Menu className="cursor-pointer" />
          </div>
          {/* Profile Placeholder */}
          <div className="hidden md:inline-flex relative items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              JL
            </span>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed top-0 left-0 z-50 w-56 h-full bg-white border-r shadow-sm transition-transform duration-300 ease-in-out`}
      >
        {/* Logo and Close Button */}
        <div className="p-6 flex justify-between items-center">
          <Leaf />
          <button className="block md:hidden" onClick={toggleSidebar}>
            <X className="cursor-pointer" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col">
          {/* Logout Button */}
          <div className="p-1">
            <LogoutButton refreshToken={refreshToken} />
          </div>

          {/* Sidebar Items */}
          {sidebarItems.map(({ icon: Icon, href, label }, index) => (
            <SidebarItem key={index} icon={Icon} href={href} label={label} />
          ))}
        </nav>
      </aside>

      {/* Overlay (optional for closing sidebar when clicking outside) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-40"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
