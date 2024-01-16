"use client";
import React from "react";
import { useTranslations } from "next-intl";
import HeadContent from "../../../../../../components/common/HeadContent";
import { StyledPrimaryButton } from "../../../../../../styles/commons";
import CustomIconBtn from "../../../../../../components/common/Button/CustomIconBtn";
import SaveIcon from "@mui/icons-material/Save";
import { Accordion, AccordionDetails, AccordionSummary, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { themeColors } from "../../../../../../theme/theme";
import TabItem from "../../../../../../components/common/Tab/TabItem";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ConfigMainFieldForm from "../../../../../../components/common/Events/ConfigMainField/ConfigMainField";

type Props = {};

const EventConfigurationPage = (props: Props) => {
  // ** I18n
  const translation = useTranslations();

  return (
    <div className="p-3">
      <HeadContent hasBackBtn title={translation("configEventPage.title")}>
        <div className="hidden md:block">
          <StyledPrimaryButton size="small">{translation("action.save")}</StyledPrimaryButton>
        </div>

        <CustomIconBtn className="md:hidden">
          <SaveIcon />
        </CustomIconBtn>
      </HeadContent>

      <div className="sticky hidden overflow-hidden align-top bg-white rounded-md w-60 top-5 lg:inline-block ">
        <TabItem icon={<SettingsApplicationsIcon />} label="Config main fields" active />
        <TabItem icon={<SettingsApplicationsIcon />} label="Config main fields" />
        <TabItem icon={<SettingsApplicationsIcon />} label="Config main fields" />
        <TabItem icon={<SettingsApplicationsIcon />} label="Config main fields" />
        <TabItem icon={<SettingsApplicationsIcon />} label="Config main fields" />
      </div>

      <div className="bg-white p-3 rounded-md inline-block lg:ml-3 lg:w-[calc(100%-252px)]">
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            sx={{ backgroundColor: themeColors.colors.grayEFE }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Config main fields
          </AccordionSummary>
          <AccordionDetails>
            <ConfigMainFieldForm />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            sx={{ backgroundColor: themeColors.colors.grayEFE }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Accordion 1
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            sx={{ backgroundColor: themeColors.colors.grayEFE }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Accordion 1
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            sx={{ backgroundColor: themeColors.colors.grayEFE }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Accordion 1
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            sx={{ backgroundColor: themeColors.colors.grayEFE }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Accordion 1
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            sx={{ backgroundColor: themeColors.colors.grayEFE }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Accordion 1
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            sx={{ backgroundColor: themeColors.colors.grayEFE }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Accordion 1
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            sx={{ backgroundColor: themeColors.colors.grayEFE }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Accordion 1
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            sx={{ backgroundColor: themeColors.colors.grayEFE }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Accordion 1
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            sx={{ backgroundColor: themeColors.colors.grayEFE }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Accordion 1
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default EventConfigurationPage;
