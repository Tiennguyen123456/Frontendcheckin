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
import { IRouterBreadcrumbs } from "../models/Route";

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  EVENTS: "/events",
  CAMPAIGNS: "/campaigns",
  CAMPAIGNS_DETAILS: "/campaigns/details",
  DATA: "/data",
  TEMP_DATA_PAGE_1: "/data/temp-data-page-1",
  TEMP_DATA_PAGE_2: "/data/temp-data-page-2",
  REPORT: "/reports",
  TEMP_REPORT_PAGE: "/reports/temp-report-page",
  COMPANIES: "/companies",
  ACCOUNTS: "/accounts",
  ROLES: "/roles",
  PERMISSIONS: "/permissions",
  LANGUAGES: "/languages",
  CONFIGURATIONS: "/configurations",
  403: "/403",
};

export const ROUTERS_BREADCRUMBS: IRouterBreadcrumbs[] = [
  {
    name: "Home",
    slug: ROUTES.DASHBOARD,
  },
  {
    name: "Events",
    slug: ROUTES.EVENTS,
  },
  {
    name: "Campaigns",
    slug: ROUTES.CAMPAIGNS,
  },
  {
    name: "Campaigns Details",
    slug: ROUTES.CAMPAIGNS_DETAILS,
  },
  {
    name: "Temp Data Page 1",
    slug: ROUTES.TEMP_DATA_PAGE_1,
  },
  {
    name: "Temp Data Page 2",
    slug: ROUTES.TEMP_DATA_PAGE_2,
  },
  {
    name: "Temp Report Page",
    slug: ROUTES.TEMP_REPORT_PAGE,
  },
  {
    name: "Company",
    slug: ROUTES.COMPANIES,
  },
  {
    name: "Accounts",
    slug: ROUTES.ACCOUNTS,
  },
  {
    name: "Roles",
    slug: ROUTES.ROLES,
  },
  {
    name: "Permissions",
    slug: ROUTES.PERMISSIONS,
  },
  {
    name: "Languages",
    slug: ROUTES.LANGUAGES,
  },
  {
    name: "Configurations",
    slug: ROUTES.CONFIGURATIONS,
  },
];

export const PRIVATE_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.EVENTS,
  ROUTES.CAMPAIGNS,
  ROUTES.CAMPAIGNS_DETAILS,
  ROUTES.DATA,
  ROUTES.TEMP_DATA_PAGE_1,
  ROUTES.TEMP_DATA_PAGE_2,
  ROUTES.REPORT,
  ROUTES.TEMP_REPORT_PAGE,
  ROUTES.COMPANIES,
  ROUTES.ACCOUNTS,
  ROUTES.ROLES,
  ROUTES.PERMISSIONS,
  ROUTES.LANGUAGES,
  ROUTES.CONFIGURATIONS,
];

export const AppRoutes: SideBarItemType[] = [
  {
    path: ROUTES.DASHBOARD,
    key: "dashboard",
    sideBarProps: {
      displayText: "sidebar.items.dashboard",
      icon: <DashboardIcon fontSize="small" />,
    },
  },
  {
    key: "activity",
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
        },
        {
          path: ROUTES.CAMPAIGNS,
          key: "activity.campaigns",
          sideBarProps: {
            displayText: "sidebar.items.campaigns",
            icon: <CampaignIcon fontSize="small" />,
          },
        },
        {
          path: ROUTES.DATA,
          key: "activity.data",
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
            },
            {
              path: ROUTES.TEMP_DATA_PAGE_2,
              key: "activity.data.tempDataPage2",
              sideBarProps: {
                displayText: "sidebar.items.tempDataPage2",
              },
            },
          ],
        },
        {
          path: ROUTES.REPORT,
          key: "activity.reports",
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
            },
          ],
        },
      ],
    },
  },
  {
    key: "administration",
    group: {
      name: "sidebar.groups.administration",
      child: [
        {
          key: "administration.companies",
          path: ROUTES.COMPANIES,
          sideBarProps: {
            displayText: "sidebar.items.companies",
            icon: <BusinessIcon fontSize="small" />,
          },
        },
        {
          key: "administration.accounts",
          path: ROUTES.ACCOUNTS,
          sideBarProps: {
            displayText: "sidebar.items.accounts",
            icon: <PeopleAltIcon fontSize="small" />,
          },
        },
        {
          key: "administration.roles",
          path: ROUTES.ROLES,
          sideBarProps: {
            displayText: "sidebar.items.roles",
            icon: <ManageAccountsIcon fontSize="small" />,
          },
        },
        {
          key: "administration.permissions",
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
    group: {
      name: "sidebar.groups.setting",
      child: [
        {
          key: "setting.languages",
          path: ROUTES.LANGUAGES,
          sideBarProps: {
            displayText: "sidebar.items.languages",
            icon: <GTranslateIcon fontSize="small" />,
          },
        },
        {
          key: "setting.configurations",
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
