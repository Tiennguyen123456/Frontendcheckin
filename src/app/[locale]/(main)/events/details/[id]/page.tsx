"use client";
import React from "react";
import HeadContent from "@/components/common/HeadContent";
import { StyledContentWrapper, StyledPrimaryButton } from "@/styles/commons";
import { useTranslations } from "next-intl";
import CustomIconBtn from "@/components/common/Button/CustomIconBtn";
import SaveIcon from "@mui/icons-material/Save";
import EventDetails from "@/components/common/Events/EventDetails";
import { Box } from "@mui/material";

type Props = {};

const EventDetailsPage = (props: Props) => {
  // ** I18n
  const translation = useTranslations();

  return (
    <div className="p-3">
      <HeadContent hasBackBtn title={translation("eventDetailsPage.title")}>
        <div className="hidden md:block">
          <StyledPrimaryButton size="small">{translation("action.save")}</StyledPrimaryButton>
        </div>

        <CustomIconBtn className="md:hidden">
          <SaveIcon />
        </CustomIconBtn>
      </HeadContent>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <StyledContentWrapper className="md:max-w-[1000px]">
          <EventDetails />
        </StyledContentWrapper>
      </Box>
    </div>
  );
};

export default EventDetailsPage;
