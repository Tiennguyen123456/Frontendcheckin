"use client";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MonitorIcon from "@mui/icons-material/Monitor";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import Callout from "../../../../components/common/Callout";
import HeadContent from "../../../../components/common/HeadContent";
import { StyledContentWrapper } from "../../../../styles/commons";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import DemoChart from "../../../../components/common/ReactApexChart/demo";

type Props = {};

const Dashboard = (props: Props) => {
  // ** I18n
  const translation = useTranslations();

  return (
    <div className="p-3">
      <HeadContent title="Dashboard"></HeadContent>

      <StyledContentWrapper>
        <div className={clsx("grid gap-y-3 gap-x-3 md:flex md:flex-wrap lg:grid-cols-3")}>
          <Callout icon={<MonitorIcon />} title={`${translation("callOut.totalEvent")} : 100`} />
          <Callout icon={<EventNoteIcon />} title={`${translation("callOut.eventTakingPlace")} : 100`} />
          <Callout icon={<UpcomingIcon />} title={`${translation("callOut.upcomingEvent")} : 100`} />
        </div>
      </StyledContentWrapper>

      <StyledContentWrapper className="mt-5">
        <div className={clsx("grid gap-x-3 lg:grid-cols-2")}>
          <div>
            <DemoChart />
          </div>
          <div></div>
        </div>
      </StyledContentWrapper>
    </div>
  );
};

export default Dashboard;
