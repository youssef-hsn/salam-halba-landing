"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { mainDestinations } from "~/consts/navItems";

function Association({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      className="flex min-w-fit items-center space-x-2"
      onClick={onClick}
    >
      <Image
        src="/Salam Halba Logo.png"
        alt="Salam Halba Logo"
        width={40}
        height={40}
      />
      <span className="animation-fade-in animate-fadin-out text-xl font-bold text-nowrap text-gray-900 transition-colors duration-400 hover:text-blue-600">
        Salam Halba
      </span>
    </Link>
  );
}

function ActionButtons({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Button
        variant="outline"
        className="border-blue-200 text-blue-600 hover:bg-blue-50"
      >
        Volunteer
      </Button>
      <Button className="bg-blue-600 hover:bg-blue-700">Donate</Button>
    </div>
  );
}

function NavDestinations({ className }: { className: string }) {
  return (
    <nav className={className}>
      {mainDestinations.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-sm font-medium text-nowrap text-gray-700 transition-colors hover:text-blue-600"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-5 flex h-16 items-center justify-between space-x-4">
        <Association />
        <NavDestinations className="hidden w-full space-x-8 lg:flex" />
        <ActionButtons className="hidden items-center space-x-4 lg:flex" />

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-80 p-2.5" noCloseButton>
            <SheetTitle>
              <div className="mb-8 flex items-center justify-between">
                <Association onClick={() => setIsOpen(false)} />
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </SheetTitle>
            <NavDestinations className="" />

            <ActionButtons className="flex flex-col space-y-2.5" />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
