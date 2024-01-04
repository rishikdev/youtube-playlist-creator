"use client";

import { AppDispatch, useAppSelector } from "@/app/(state)/store";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import {
  updatePlaylistLink,
  updateErrorMessage,
  updateStatus,
  ApplicationStatus,
} from "@/app/(state)/(slices)/playlist-creator-slice";

const CreatePlaylistButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  const linksTextareaValue = useAppSelector(
    (state) => state.playlistCreatorReducer.value.textAreaValue
  );

  function handleOnClick() {
    const validYouTubeLink = "youtube.com/watch?v=";
    const prefix = "https://www.youtube.com/watch_videos?video_ids=";

    var videos = linksTextareaValue.trim().split("\n");
    var videoIds = [];
    var hasError = false;

    if (videos.length > 50) {
      dispatch(updateStatus(ApplicationStatus.EncounteredError));
      dispatch(updateErrorMessage("Video count cannot be greater than 50"));
      hasError = true;
    }

    for (var index = 0; index < videos.length; index = index + 1) {
      var video = videos[index];
      if (
        video.toLocaleLowerCase().includes(validYouTubeLink) &&
        video.split("watch?v=")[1].trim().length != 0
      ) {
        videoIds.push(video.split("watch?v=")[1]);
      } else {
        dispatch(updateStatus(ApplicationStatus.EncounteredError));
        dispatch(updateErrorMessage("Found an invalid YouTube link"));
        hasError = true;
      }
    }

    if (!hasError) {
      dispatch(updateStatus(ApplicationStatus.NoError));
      dispatch(updatePlaylistLink(prefix + videoIds.join(",")));
    }
  }

  return (
    <Button
      className="cursor-pointer md:col-start-4 md:col-span-4"
      onClick={handleOnClick}
      disabled={linksTextareaValue.trim().length == 0}
    >
      Create Playlist
    </Button>
  );
};

export default CreatePlaylistButton;
