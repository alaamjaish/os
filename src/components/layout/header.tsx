"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Palette, Image, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Generator", href: "/", icon: Palette },
  { name: "Gallery", href: "/gallery", icon: Image },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70 shadow-[0_6px_20px_-18px_rgba(15,23,42,0.35)]">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/50 shadow-[0_8px_18px_-12px_rgba(2,78,116,0.6)]">
            <Palette className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display hidden font-bold tracking-tight sm:inline-block">
            Vocabulary Image Generator
          </span>
        </div>
        <nav className="flex items-center space-x-1">
          {navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "gap-2",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.name}</span>
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
