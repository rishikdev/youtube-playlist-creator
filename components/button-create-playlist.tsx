"use client";

import { AppDispatch, useAppSelector } from "@/app/(state)/store";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import {
  updatePlaylistLink,
  updateErrorMessage,
  updateStatus,
  ApplicationStatus,
  updateEmbeddedPlaylistLink,
} from "@/app/(state)/(slices)/playlist-creator-slice";

const ButtonCreatePlaylist = () => {
  const dispatch = useDispatch<AppDispatch>();

  const linksTextareaValue = useAppSelector(
    (state) => state.playlistCreatorReducer.value.textAreaValue
  );

  function getVideoId(video: string): string {
    const videoIdLength = 11;

    const validYouTubeLinkFull = "youtube.com/watch?v=";
    const validYouTubeLinkLive = "youtube.com/live/";
    const validYouTubeShortsLinkFull = "youtube.com/shorts/";
    const validYouTubeLinkShortened = "youtu.be/";

    var videoId = "";

    if (
      video.toLocaleLowerCase().includes(validYouTubeLinkFull) &&
      video.split("watch?v=")[1].trim().length != 0
    ) {
      videoId = video.split("watch?v=")[1].substring(0, videoIdLength);
    } else if (
      video.toLocaleLowerCase().includes(validYouTubeLinkLive) &&
      video.split("/live/")[1].trim().length != 0
    ) {
      videoId = video.split("/live/")[1].substring(0, videoIdLength);
    } else if (
      video.toLocaleLowerCase().includes(validYouTubeShortsLinkFull) &&
      video.split("/shorts/")[1].trim().length != 0
    ) {
      videoId = video.split("/shorts/")[1].substring(0, videoIdLength);
    } else if (
      video.toLocaleLowerCase().includes(validYouTubeLinkShortened) &&
      video.split("youtu.be/")[1].trim().length != 0
    ) {
      videoId = video.split("youtu.be/")[1].substring(0, videoIdLength);
    } else {
      throw Error("Found and invalid YouTube link");
    }

    if (videoId.length != 11 || !videoId.match(/^[a-zA-Z0-9_\-]+$/)) {
      throw Error("Found and invalid YouTube link");
    }

    return videoId;
  }

  function handleOnClick() {
    const prefix = "https://www.youtube.com/watch_videos?video_ids=";
    const prefixEmbedded = "http://www.youtube.com/embed/?playlist=";

    var videos = linksTextareaValue
      .trim()
      .split(/,| |\n/)
      .filter((element) => element);

    videos = [...new Set(videos)];

    var videoIds: string[] = [];
    var hasError = false;

    if (videos.length > 50) {
      dispatch(updateStatus(ApplicationStatus.EncounteredError));
      dispatch(updateErrorMessage("Video count cannot be greater than 50"));
      hasError = true;
    }

    for (var index = 0; index < videos.length; index = index + 1) {
      var video = videos[index];

      try {
        var videoId = getVideoId(video);
        videoIds.push(videoId);
      } catch (error) {
        dispatch(updateStatus(ApplicationStatus.EncounteredError));
        dispatch(updateErrorMessage("Found an invalid YouTube link"));
        hasError = true;
      }
    }

    if (!hasError) {
      dispatch(updateStatus(ApplicationStatus.NoError));
      dispatch(updatePlaylistLink(prefix + videoIds.join(",")));
      dispatch(updateEmbeddedPlaylistLink(prefixEmbedded + videoIds.join(",")));
    }
  }

  return (
    <Button
      className="cursor-pointer text-lg md:text-sm md:col-start-4 md:col-span-4"
      onClick={handleOnClick}
      disabled={linksTextareaValue.trim().length == 0}
    >
      Create Playlist
    </Button>
  );
};

export default ButtonCreatePlaylist;
