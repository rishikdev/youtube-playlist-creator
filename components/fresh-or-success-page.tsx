"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Copy, ExternalLink, XSquare } from "lucide-react";
import ButtonCreatePlaylist from "./button-create-playlist";
import { toast } from "sonner";
import { AppDispatch, useAppSelector } from "@/app/(state)/store";
import {
  ApplicationStatus,
  updateStatus,
} from "@/app/(state)/(slices)/playlist-creator-slice";
import { useDispatch } from "react-redux";
import TextareaLinks from "./textarea-links";

const FreshOrSuccessPage = () => {
  const playlistLink = useAppSelector(
    (state) => state.playlistCreatorReducer.value.playlistLink
  );

  function copyPlaylistLink() {
    try {
      navigator.clipboard.writeText(playlistLink);

      toast.success("Link copied to clipboard", {
        action: {
          label: "Dismiss",
          onClick: () => {},
        },
      });
    } catch (error) {
      toast.error("Could not copy link to clipboard", {
        action: {
          label: "Dismiss",
          onClick: () => {},
        },
      });
    }
  }

  const dispatch = useDispatch<AppDispatch>();
  const status = useAppSelector(
    (state) => state.playlistCreatorReducer.value.applicationStatus
  );

  return (
    <Dialog
      open={status == ApplicationStatus.NoError}
      onOpenChange={() =>
        dispatch(dispatch(updateStatus(ApplicationStatus.Fresh)))
      }
    >
      <div className="m-2">
        <div className="grid md:grid-cols-10 space-y-2">
          <TextareaLinks />
          <DialogTrigger asChild>
            <ButtonCreatePlaylist />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Playlist Link</DialogTitle>
              <DialogDescription>
                Paste this link in a new tab to start watching the videos!
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input id="link" defaultValue={playlistLink} readOnly />
              </div>
              <Button
                type="submit"
                size="sm"
                className="px-3"
                onClick={copyPlaylistLink}
              >
                <span className="sr-only"></span>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <DialogFooter className="grid grid-cols-2 gap-4 justify-between">
              <Button
                variant="secondary"
                onClick={() => window.open(playlistLink, "_blank")}
              >
                <ExternalLink className="hidden md:flex h-4 w-4 mr-3" />
                Open in a new tab
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="destructive">
                  <XSquare className="hidden md:flex h-4 w-4 mr-3" />
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </div>
      </div>
    </Dialog>
  );
};

export default FreshOrSuccessPage;
