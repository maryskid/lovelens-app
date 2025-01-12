"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get the current route for active link highlighting

  const handleNavigation = (path) => {
    setIsOpen(false);
    router.push(path);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Report example", path: "/sample-report" },
    { name: "Get your report", path: "/get-report" },
  ];

  return (
    <nav className="flex justify-between items-center px-6 py-4 md:px-24 md:py-6 relative bg-white shadow-sm">
      {/* Logo */}
      <Image
        className="cursor-pointer"
        src="/lovelens-logo.png"
        alt="Logo"
        width={100}
        height={100}
        onClick={() => handleNavigation("/")}
      />

      {/* Navigation Links */}
      <div
        className={clsx(
          "absolute top-full left-0 w-full md:w-auto md:static bg-white z-20",
          isOpen ? "block" : "hidden md:block"
        )}
      >
        <ul className="flex flex-col md:flex-row items-center gap-4 py-4 md:gap-10 md:py-0">
          {navLinks.map((link) => (
            <li
              key={link.name}
              className={clsx(
                "cursor-pointer hover:text-primary hover:font-bold transition",
                pathname === link.path ? "text-primary font-bold" : "text-slate-500"
              )}
              onClick={() => handleNavigation(link.path)}
            >
              {link.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Toggle Icon for Mobile */}
      <div className="md:hidden">
        {isOpen ? (
          <X className="cursor-pointer" size={28} onClick={toggleMenu} />
        ) : (
          <Menu className="cursor-pointer" size={28} onClick={toggleMenu} />
        )}
      </div>
    </nav>
  );
}
