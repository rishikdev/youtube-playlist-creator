import { cn } from "@/lib/utils";
import { Youtube } from "lucide-react";
import { Concert_One } from "next/font/google";

const customFont = Concert_One({
  weight: "400",
  subsets: ["latin"],
});

const Brand = () => {
  return (
    <div className="flex items-center">
      <Youtube className="h-7 w-7 md:h-10 md:w-10 mr-3" />
      <p className={cn("text-xl md:text-2xl", customFont.className)}>
        YouTube Playlist Creator
      </p>
    </div>
  );
};

export default Brand;
