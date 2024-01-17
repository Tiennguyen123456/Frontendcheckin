"use client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveIcon from "@mui/icons-material/Save";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CustomIconBtn from "@/components/common/Button/CustomIconBtn";
import ConfigMainFieldForm from "@/components/common/Events/ConfigMainField/ConfigMainField";
import HeadContent from "@/components/common/HeadContent";
import TabItem from "@/components/common/Tab/TabItem";
import { EventConfigFieldType, EventConfigTemplateType } from "../../../../../../models/Event";
import eventApi from "../../../../../../services/event-api";
import { StyledPrimaryButton } from "../../../../../../styles/commons";
import { themeColors } from "../../../../../../theme/theme";
import { toastError } from "../../../../../../utils/toast";

type Props = {};

const EventConfigurationPage = (props: Props) => {
  // ** I18n
  const translation = useTranslations();

  // ** Route
  const { id } = useParams();

  // ** State
  const [eventConfigFields, setEventConfigFields] = useState<EventConfigFieldType[]>([]);
  const [templateFieldConfig, setTemplateFieldConfig] = useState<EventConfigTemplateType>();

  // ** Functions
  const handleGetEventConfigField = async () => {
    try {
      if (id) {
        const response = await eventApi.getEventConfigFields(id as string);
        if (response.status === "success") {
          const data = response?.data;
          setTemplateFieldConfig(response?.data?.template);

          const mainFields: EventConfigFieldType[] = data?.main_fields
            ? Object.keys(data?.main_fields).map((key) => data?.main_fields?.[key])
            : [];

          const customFields: EventConfigFieldType[] = data?.custom_fields
            ? Object.keys(data?.custom_fields).map((key) => data?.custom_fields?.[key])
            : [];

          setEventConfigFields([...mainFields, ...customFields]);
        }
      }
    } catch (error: any) {
      console.log("error: ", error);
      const data = error?.response?.data;
      if (data?.message_code) {
        toastError(translation(`errorApi.${data?.message_code}`));
      } else {
        toastError(translation("errorApi.GET_EVENT_CONFIG_FIELDS_FAILED"));
      }
    }
  };

  useEffect(() => {
    handleGetEventConfigField();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      <div className="sticky hidden overflow-hidden align-top bg-white rounded-md w-64 top-5 lg:inline-block ">
        <TabItem
          icon={<SettingsApplicationsIcon />}
          label={translation("configEventPage.configTabs.configFields")}
          active
        />
        <TabItem
          icon={<SettingsApplicationsIcon />}
          label={translation("configEventPage.configTabs.configPrintTemplates")}
        />
        <TabItem
          icon={<SettingsApplicationsIcon />}
          label={translation("configEventPage.configTabs.configBackground")}
        />
        <TabItem icon={<SettingsApplicationsIcon />} label={translation("configEventPage.configTabs.configLanguage")} />
        <TabItem icon={<SettingsApplicationsIcon />} label={translation("configEventPage.configTabs.configEvent")} />
      </div>

      <div className="bg-white p-3 rounded-md inline-block lg:ml-3 lg:w-[calc(100%-268px)]">
        <Accordion defaultExpanded sx={{ boxShadow: "none" }}>
          <AccordionSummary
            sx={{ backgroundColor: themeColors.colors.grayEFE, fontWeight: 600 }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
          >
            {translation("configEventPage.configTabs.configFields")}
          </AccordionSummary>
          <AccordionDetails>
            <ConfigMainFieldForm defaultConfigFields={eventConfigFields} templateFieldConfig={templateFieldConfig} />
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            sx={{ backgroundColor: themeColors.colors.grayEFE, fontWeight: 600 }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
          >
            {translation("configEventPage.configTabs.configPrintTemplates")}
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            sx={{ backgroundColor: themeColors.colors.grayEFE, fontWeight: 600 }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
          >
            {translation("configEventPage.configTabs.configBackground")}
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            sx={{ backgroundColor: themeColors.colors.grayEFE, fontWeight: 600 }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
          >
            {translation("configEventPage.configTabs.configLanguage")}
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            sx={{ backgroundColor: themeColors.colors.grayEFE, fontWeight: 600 }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
          >
            {translation("configEventPage.configTabs.configEvent")}
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
