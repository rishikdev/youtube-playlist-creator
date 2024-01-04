"use client";

import { ClipboardPaste } from "lucide-react";
import { Button } from "./ui/button";

const ClipboardPasteButton = () => {
  async function handleOnClick() {
    try {
      const text = await navigator.clipboard.readText();
      console.log(text);
    } catch (error) {
      console.log("Failed to read clipboard");
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative bottom-0 left-0 m-3 z-10"
    >
      <ClipboardPaste className="h-4 w-4" />
    </Button>
  );
};

export default ClipboardPasteButton;
