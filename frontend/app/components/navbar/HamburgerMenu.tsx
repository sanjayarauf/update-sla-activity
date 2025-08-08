"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/device", label: "Devices" },
    { href: "/sensor", label: "Sensors" },
    { href: "/alert", label: "Alerts" },
    { href: "/ticket", label: "Ticket" },
    { href: "/sla", label: "SLA" },
    { href: "/activity", label: "Activity" },
    { href: "/account", label: "Account" },
  ];

  // Cegah scroll saat menu terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      {/* Tombol Hamburger */}
      <button
        onClick={() => setIsOpen(true)}
        className="z-50 fixed top-4 right-4 space-y-1 text-white text-3xl p-2 bg-[#030E1C] rounded-md shadow-lg"
        aria-label="Open menu"
      >
        <span className="block h-1 w-6 bg-amber-50" />
        <span className="block h-1 w-6 bg-amber-50" />
        <span className="block h-1 w-6 bg-amber-50" />
      </button>

      {/* Overlay transparan gelap */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-56 bg-[#030E1C] z-50 transform transition-transform duration-300 overflow-y-auto shadow-xl
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Tombol close */}
        <div className="flex justify-end p-2">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-3xl hover:text-red-400"
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center p-2">
          <Image
            src="/Pressoc.png"
            alt="Logo"
            width={140}
            height={140}
            className="object-contain border border-[#5d7bb6] rounded-xl"
            priority
          />
        </div>

        <hr className="my-4 border-t border-[#5d7bb6] opacity-30 mx-4" />

        {/* Daftar menu */}
        <ul className="flex flex-col text-white text-sm w-full px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} className="w-full">
                <Link
                  href={item.href}
                  className={`block py-2 px-3 rounded-md text-center transition-all w-full
                    ${
                      isActive
                        ? "text-[#ffffff] bg-[#1e2e4a]"
                        : "hover:text-[#ffffff] hover:bg-[#1e2e4a]"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
