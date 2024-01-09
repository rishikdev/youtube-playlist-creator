import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import Brand from "./brand";
import ButtonGitHub from "./button-github";

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between p-2">
        <Brand />
        <div className="flex">
          <ButtonGitHub />
          <ThemeToggle />
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default Navbar;
