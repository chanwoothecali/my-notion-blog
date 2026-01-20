"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { marketingNav } from "@/config/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="text-left">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center space-x-2"
            >
              <span className="font-bold text-xl">{siteConfig.name}</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          {marketingNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-lg font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
          <div className="h-px bg-border my-4" />
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            로그인
          </Link>
          <Link
            href="/register"
            onClick={() => setOpen(false)}
            className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            회원가입
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
