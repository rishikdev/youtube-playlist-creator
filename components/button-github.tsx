import { Github } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const ButtonGitHub = () => {
  return (
    <Button variant="outline" size="icon" className="mr-1" asChild>
      <Link
        href="https://github.com/rishikdev/youtube-playlist-creator"
        target="_blank"
      >
        <Github />
      </Link>
    </Button>
  );
};

export default ButtonGitHub;
