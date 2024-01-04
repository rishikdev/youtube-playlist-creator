"use client";

import ClipboardPasteButton from "./clipboard-paste-button";
import LinksTextarea from "./links-textarea";

const LinksInputArea = () => {
  return (
    <>
      <LinksTextarea />
      <ClipboardPasteButton />
    </>
  );
};

export default LinksInputArea;
