"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import TextareaLinks from "./textarea-links";
import ButtonCreatePlaylist from "./button-create-playlist";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/(state)/store";
import {
  ApplicationStatus,
  updateStatus,
} from "@/app/(state)/(slices)/playlist-creator-slice";

const FailurePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useAppSelector(
    (state) => state.playlistCreatorReducer.value.applicationStatus
  );
  const errorMessage = useAppSelector(
    (state) => state.playlistCreatorReducer.value.errorMessage
  );

  return (
    <AlertDialog
      open={status == ApplicationStatus.EncounteredError}
      onOpenChange={() => dispatch(updateStatus(ApplicationStatus.Fresh))}
    >
      <div className="m-2">
        <div className="grid md:grid-cols-10 space-y-2">
          <TextareaLinks />
          <AlertDialogTrigger asChild>
            <ButtonCreatePlaylist />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Something went wrong</AlertDialogTitle>
              <AlertDialogDescription>{errorMessage}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Ok</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </div>
      </div>
    </AlertDialog>
  );
};

export default FailurePage;
