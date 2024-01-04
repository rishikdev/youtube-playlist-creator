"use client";

import CustomAlertDialog from "@/components/alert-dialog";
import { ApplicationStatus } from "./(state)/(slices)/playlist-creator-slice";
import { useAppSelector } from "./(state)/store";
import SuccessDialog from "@/components/success-dialog";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  const applicationStatus = useAppSelector(
    (state) => state.playlistCreatorReducer.value.applicationStatus
  );

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        {applicationStatus == ApplicationStatus.EncounteredError ? (
          <CustomAlertDialog />
        ) : (
          <SuccessDialog />
        )}
        <Toaster />
      </ThemeProvider>
    </>
  );
}
