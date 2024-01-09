"use client";

import { ApplicationStatus } from "@/app/(state)/(slices)/playlist-creator-slice";
import { useAppSelector } from "@/app/(state)/store";
import FailurePage from "./failure-page";
import FreshOrSuccessPage from "./fresh-or-success-page";

const ConditionalPage = () => {
  const applicationStatus = useAppSelector(
    (state) => state.playlistCreatorReducer.value.applicationStatus
  );
  return (
    <>
      {applicationStatus == ApplicationStatus.EncounteredError ? (
        <FailurePage />
      ) : (
        <FreshOrSuccessPage />
      )}
    </>
  );
};

export default ConditionalPage;
