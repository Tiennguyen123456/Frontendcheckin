"use client";
import React, { useEffect, useState } from "react";
import HeadContent from "@/components/common/HeadContent";
import { StyledContentWrapper, StyledPrimaryButton } from "@/styles/commons";
import { useTranslations } from "next-intl";
import CustomIconBtn from "@/components/common/Button/CustomIconBtn";
import SaveIcon from "@mui/icons-material/Save";
import { Box } from "@mui/material";
import CompanyDetails from "@/components/common/Companies/CompanyDetails";
import companyApi from "@/services/company-api";
import { useParams } from "next/navigation";
import { ICompanyRes } from "@/models/api/company-api";

type Props = {};

const CompanyDetailsPage = (props: Props) => {
  // ** I18n
  const translation = useTranslations();
  const { id } = useParams();

  const [companyDetail, setCompanyDetails] = useState<ICompanyRes>();

  const handleGetCompanyDetails = async () => {
    try {
      const response = await companyApi.getCompanyDetails(id);
      if (response.status === "success") {
        setCompanyDetails(response.data);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (id) handleGetCompanyDetails();
  }, []);

  return (
    <div className="p-3">
      <HeadContent hasBackBtn title={translation("eventDetailsPage.title")}>
        <div className="hidden md:block">
          <StyledPrimaryButton form="companyForm" type="submit" size="small">
            {translation("action.save")}
          </StyledPrimaryButton>
        </div>

        <CustomIconBtn className="md:hidden">
          <SaveIcon />
        </CustomIconBtn>
      </HeadContent>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <StyledContentWrapper className="md:max-w-[1000px]">
          <CompanyDetails companyDetail={companyDetail} onRefetch={handleGetCompanyDetails} />
        </StyledContentWrapper>
      </Box>
    </div>
  );
};

export default CompanyDetailsPage;
