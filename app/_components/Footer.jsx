import React from "react";
import Image from "next/legacy/image";
import { guthenBloots, recoleta } from "@/fonts/typo";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0">
        {/* Left Section */}
        <div className="space-y-4">
          {/* Logo and Description */}
          <div className="flex items-center space-x-2">
            <Image
              src="/lovelens-logo.png"
              alt="Lovelens Logo"
              width={120}
              height={120}
              className="w-auto h-auto"
            />
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            <span className={`${guthenBloots.className} italic text-lg text-white`}>
              Helping couples{" "}
            </span>
            <span className={`${recoleta.className} text-gray-300`}>
              build deeper connections and <br /> strengthen their relationships
              through <br /> insightful tools and resources.
            </span>
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full md:w-auto md:gap-12">
          {/* Support Links */}
          <div className="space-y-2 md:space-y-1">
            <h3 className="text-gray-400 font-semibold uppercase tracking-wide text-sm">
              Support
            </h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-orange-500 text-sm"
                >
                  Getting started
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-orange-500 text-sm"
                >
                  Contact us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-orange-500 text-sm"
                >
                  Report a bug
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-600 pt-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start space-y-4 md:space-y-0">
          <p className="text-gray-400 text-xs">Copyright © 2024 lovelens</p>
          <ul className="flex space-x-4 text-xs">
            <li>
              <a href="#" className="text-gray-300 hover:text-orange-500">
                Terms and Conditions
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-orange-500">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
