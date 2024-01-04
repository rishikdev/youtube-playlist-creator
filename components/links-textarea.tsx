"use client";

import { Textarea } from "./ui/textarea";
import { useDispatch } from "react-redux";
import { updateTextareaValue } from "@/app/(state)/(slices)/playlist-creator-slice";
import { AppDispatch, useAppSelector } from "@/app/(state)/store";

const LinksTextarea = () => {
  const dispatch = useDispatch<AppDispatch>();
  const textareaValue = useAppSelector(
    (state) => state.playlistCreatorReducer.value.textAreaValue
  );

  function handleOnChange(value: string) {
    dispatch(updateTextareaValue(value));
  }

  return (
    <Textarea
      id="linksTA"
      placeholder="Paste upto 50 video links each on a new line here..."
      className="h-56 text-lg md:text-sm md:col-start-4 md:col-span-4"
      value={textareaValue}
      onChange={(e) => handleOnChange(e.target.value)}
    />
  );
};

export default LinksTextarea;