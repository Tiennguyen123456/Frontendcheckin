"use client";
import React, { useEffect, useState } from "react";
import HeadContent from "@/components/common/HeadContent";
import { StyledContentWrapper, StyledPrimaryButton } from "@/styles/commons";
import { useTranslations } from "next-intl";
import CustomIconBtn from "@/components/common/Button/CustomIconBtn";
import SaveIcon from "@mui/icons-material/Save";
import EventDetails from "@/components/common/Events/EventDetails";
import { Box } from "@mui/material";
import { IEventRes } from "@/models/api/event-api";
import eventApi from "@/services/event-api";
import { useParams } from "next/navigation";

type Props = {};

const EventDetailsPage = (props: Props) => {
  // ** I18n
  const translation = useTranslations();
  const { id } = useParams();

  const [companyDetail, setCompanyDetails] = useState<IEventRes>();

  const handleGetEventDetails = async () => {
    try {
      const response = await eventApi.getEventDetails(id);
      if (response.status === "success") {
        setCompanyDetails(response.data);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (id) handleGetEventDetails();
  }, []);

  return (
    <div className="p-3">
      <HeadContent hasBackBtn title={translation("eventDetailsPage.title")}>
        <div className="hidden md:block">
          <StyledPrimaryButton form="eventForm" type="submit" size="small">
            {translation("action.save")}
          </StyledPrimaryButton>
        </div>

        <CustomIconBtn className="md:hidden">
          <SaveIcon />
        </CustomIconBtn>
      </HeadContent>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <StyledContentWrapper className="md:max-w-[1000px]">
          <EventDetails eventDetail={companyDetail} onRefetch={handleGetEventDetails} />
        </StyledContentWrapper>
      </Box>
    </div>
  );
};

export default EventDetailsPage;
