"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-4 py-4 md:px-10 md:py-6 relative bg-white shadow-sm">
      {/* Logo */}
      <Image src="/lovelens-logo.png" alt="Logo" width={100} height={100} />

      {/* Navigation Links - Always visible on desktop, conditional on mobile */}
      <div className={`absolute top-full left-0 w-full md:w-auto md:static bg-white z-20 ${
        isOpen ? "block" : "hidden md:block"
      }`}>
        <ul className="flex flex-col md:flex-row items-center gap-4 py-4  md:gap-10 md:py-0">
          <li
            className="cursor-pointer hover:text-primary text-slate-500 hover:font-bold"
            onClick={() => setIsOpen(false)}
          >
            Accueil
          </li>
          <li
            className="cursor-pointer hover:text-primary text-slate-500 hover:font-bold"
            onClick={() => setIsOpen(false)}
          >
            Quiz
          </li>
          <li
            className="cursor-pointer hover:text-primary text-slate-500 hover:font-bold"
            onClick={() => setIsOpen(false)}
          >
            Résultat de test
          </li>
        </ul>
      </div>

      {/* Toggle Icon for mobile */}
      <div className="md:hidden">
        {isOpen ? (
          <X
            className="cursor-pointer"
            size={28}
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <Menu
            className="cursor-pointer"
            size={28}
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>
    </nav>
  );
}
