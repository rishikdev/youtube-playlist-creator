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

  const embeddedPlaylistLink = useAppSelector(
    (state) => state.playlistCreatorReducer.value.embeddedPlaylistLink
  );

  const links = [
    {
      playlistType: "Normal",
      remarks: "",
      url: playlistLink,
    },
    {
      playlistType: "Embedded",
      remarks: "May not work on desktop browsers",
      url: embeddedPlaylistLink,
    },
  ];

  function copyPlaylistLink(link: string) {
    try {
      navigator.clipboard.writeText(link);

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
              <DialogTitle>Playlist Links</DialogTitle>
            </DialogHeader>
            <div className="grid gap-5">
              {links.map((link) => (
                <div className="grid-rows-2">
                  <p className="text-sm opacity-50 row-start-1 row-span-1">
                    {link.playlistType}
                  </p>
                  <div className="flex gap-2 items-center row-start-2 row-span-1">
                    <div className="flex-1">
                      <Input id="link" defaultValue={link.url} readOnly />
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => copyPlaylistLink(link.url)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => window.open(link.url, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </div>
      </div>
    </Dialog>
  );
};

export default FreshOrSuccessPage;
