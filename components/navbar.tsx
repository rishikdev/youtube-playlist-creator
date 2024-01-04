"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { Youtube } from "lucide-react";
import { Concert_One } from "next/font/google";
import { Separator } from "@/components/ui/separator";

const customFont = Concert_One({
  weight: "400",
  subsets: ["latin"],
});

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between p-2">
        <div className="flex items-center flex-1">
          <Youtube className="h-10 w-10 mr-3" />
          <p className={cn("text-2xl", customFont.className)}>
            YouTube Playlist Creator
          </p>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default Navbar;
