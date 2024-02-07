"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ApplicationStatus {
  Fresh,
  EncounteredError,
  NoError,
}

interface PlaylistCreatorState {
  value: {
    textAreaValue: string;
    playlistLink: string;
    embeddedPlaylistLink: string;
    errorMessage: string;
    applicationStatus: ApplicationStatus;
  };
}

const initialState: PlaylistCreatorState = {
  value: {
    textAreaValue: "",
    playlistLink: "",
    embeddedPlaylistLink: "",
    errorMessage: "",
    applicationStatus: ApplicationStatus.Fresh,
  },
};

export const playlistCreator = createSlice({
  name: "playlistCreator",
  initialState,
  reducers: {
    updateTextareaValue: (state, action: PayloadAction<string>) => {
      state.value.textAreaValue = action.payload;
    },

    updatePlaylistLink: (state, action: PayloadAction<string>) => {
      state.value.playlistLink = action.payload;
    },

    updateEmbeddedPlaylistLink: (state, action: PayloadAction<string>) => {
      state.value.embeddedPlaylistLink = action.payload;
    },

    updateStatus: (state, action: PayloadAction<ApplicationStatus>) => {
      state.value.applicationStatus = action.payload;
    },

    updateErrorMessage: (state, action: PayloadAction<string>) => {
      state.value.errorMessage = action.payload;
    },
  },
});

export const {
  updateTextareaValue,
  updatePlaylistLink,
  updateEmbeddedPlaylistLink,
  updateStatus,
  updateErrorMessage,
} = playlistCreator.actions;
export default playlistCreator.reducer;
