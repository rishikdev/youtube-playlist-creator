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
import LinksTextarea from "./links-textarea";
import CreatePlaylistButton from "./create-playlist-button";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/(state)/store";
import {
  ApplicationStatus,
  updateStatus,
} from "@/app/(state)/(slices)/playlist-creator-slice";

const CustomAlertDialog = () => {
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
        <div className="grid md:grid-cols-10 lg:grid-cols-9 space-y-2">
          <LinksTextarea />
          <AlertDialogTrigger asChild>
            <CreatePlaylistButton />
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

export default CustomAlertDialog;
