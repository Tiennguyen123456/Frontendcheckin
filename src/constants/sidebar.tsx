import { SideBarItemType } from "../models/SideBar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CelebrationIcon from "@mui/icons-material/Celebration";
import CampaignIcon from "@mui/icons-material/Campaign";
import StorageIcon from "@mui/icons-material/Storage";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HttpsIcon from "@mui/icons-material/Https";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { ROUTES } from "./routes";

export const AppRoutes: SideBarItemType[] = [
  {
    path: ROUTES.DASHBOARD,
    key: "dashboard",
    sideBarProps: {
      displayText: "sidebar.items.dashboard",
      icon: <DashboardIcon fontSize="small" />,
    },
    permissions: [],
  },
  {
    key: "activity",
    permissions: [],
    group: {
      name: "sidebar.groups.activity",
      child: [
        {
          path: ROUTES.EVENTS,
          key: "activity.events",
          sideBarProps: {
            displayText: "sidebar.items.events",
            icon: <CelebrationIcon fontSize="small" />,
          },
          permissions: ["event:view", "event_asset:view"],
        },
        {
          path: ROUTES.CAMPAIGNS,
          key: "activity.campaigns",
          sideBarProps: {
            displayText: "sidebar.items.campaigns",
            icon: <CampaignIcon fontSize="small" />,
          },
          permissions: ["campaign:view"],
        },
        {
          path: ROUTES.DATA,
          key: "activity.data",
          permissions: [],
          sideBarProps: {
            displayText: "sidebar.items.data",
            icon: <StorageIcon fontSize="small" />,
          },
          child: [
            {
              path: ROUTES.TEMP_DATA_PAGE_1,
              key: "activity.data.tempDataPage1",
              sideBarProps: {
                displayText: "sidebar.items.tempDataPage1",
              },
              permissions: [],
            },
            {
              path: ROUTES.TEMP_DATA_PAGE_2,
              key: "activity.data.tempDataPage2",
              sideBarProps: {
                displayText: "sidebar.items.tempDataPage2",
              },
              permissions: [],
            },
          ],
        },
        {
          path: ROUTES.REPORT,
          key: "activity.reports",
          permissions: [],

          sideBarProps: {
            displayText: "sidebar.items.reports",
            icon: <StackedBarChartIcon fontSize="small" />,
          },
          child: [
            {
              path: ROUTES.TEMP_REPORT_PAGE,
              key: "activity.data.tempReportPage",
              sideBarProps: {
                displayText: "sidebar.items.tempReportPage",
              },
              permissions: [],
            },
          ],
        },
      ],
    },
  },
  {
    key: "administration",
    permissions: [],
    group: {
      name: "sidebar.groups.administration",
      child: [
        {
          key: "administration.companies",
          permissions: ["company:view"],
          path: ROUTES.COMPANIES,
          sideBarProps: {
            displayText: "sidebar.items.companies",
            icon: <BusinessIcon fontSize="small" />,
          },
        },
        {
          key: "administration.accounts",
          permissions: ["user:view"],
          path: ROUTES.ACCOUNTS,
          sideBarProps: {
            displayText: "sidebar.items.accounts",
            icon: <PeopleAltIcon fontSize="small" />,
          },
        },
        {
          key: "administration.roles",
          permissions: ["user_role:view"],
          path: ROUTES.ROLES,
          sideBarProps: {
            displayText: "sidebar.items.roles",
            icon: <ManageAccountsIcon fontSize="small" />,
          },
        },
        {
          key: "administration.permissions",
          permissions: ["user_permission:view"],
          path: ROUTES.PERMISSIONS,
          sideBarProps: {
            displayText: "sidebar.items.permissions",
            icon: <HttpsIcon fontSize="small" />,
          },
        },
      ],
    },
  },
  {
    key: "setting",
    permissions: [],
    group: {
      name: "sidebar.groups.setting",
      child: [
        {
          key: "setting.languages",
          permissions: ["language:view"],
          path: ROUTES.LANGUAGES,
          sideBarProps: {
            displayText: "sidebar.items.languages",
            icon: <GTranslateIcon fontSize="small" />,
          },
        },
        {
          key: "setting.configurations",
          permissions: ["event:config"],
          path: ROUTES.CONFIGURATIONS,
          sideBarProps: {
            displayText: "sidebar.items.configurations",
            icon: <SettingsSuggestIcon fontSize="small" />,
          },
        },
      ],
    },
  },
];
