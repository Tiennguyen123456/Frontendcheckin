"use client";
import React from "react";
import HeadContent from "@/components/common/HeadContent";
import { StyledContentWrapper, StyledPrimaryButton } from "@/styles/commons";
import CustomIconBtn from "@/components/common/Button/CustomIconBtn";
import SaveIcon from "@mui/icons-material/Save";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import CompanyDetails from "@/components/common/Companies/CompanyDetails";

type Props = {};

const CreateEventPage = (props: Props) => {
  // ** I18n
  const translation = useTranslations();

  return (
    <div className="p-3">
      <HeadContent hasBackBtn title={translation("companyEventPage.title")}>
        <div className="hidden md:block">
          <StyledPrimaryButton form="companyForm" type="submit" size="small">
            {translation("action.create")}
          </StyledPrimaryButton>
        </div>

        <CustomIconBtn className="md:hidden">
          <SaveIcon />
        </CustomIconBtn>
      </HeadContent>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <StyledContentWrapper className="md:max-w-[1000px]">
          <CompanyDetails onRefetch={() => {}} />
        </StyledContentWrapper>
      </Box>
    </div>
  );
};

export default CreateEventPage;
