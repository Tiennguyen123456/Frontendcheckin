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
  EVENT_CREATE: "/events/create",
  EVENT_DETAILS: "/events/details",
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
    name: "Create Event",
    slug: ROUTES.EVENT_CREATE,
  },
  {
    name: "Event Details",
    slug: ROUTES.EVENT_DETAILS,
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
  ROUTES.EVENT_CREATE,
  ROUTES.EVENT_DETAILS,
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
  ROUTES[403],
];

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

export const AppRoutesPermissions = [
  { path: ROUTES.LOGIN, permissions: [] },
  { path: ROUTES.DASHBOARD, permissions: [] },
  { path: ROUTES.EVENTS, permissions: ["event:view", "event_asset:view"] },
  { path: ROUTES.EVENT_CREATE, permissions: [] },
  { path: ROUTES.EVENT_DETAILS, permissions: [] },
  { path: ROUTES.CAMPAIGNS, permissions: ["campaign:view"] },
  { path: ROUTES.CAMPAIGNS_DETAILS, permissions: ["campaign:view"] },
  { path: ROUTES.DATA, permissions: [] },
  { path: ROUTES.TEMP_DATA_PAGE_1, permissions: [] },
  { path: ROUTES.TEMP_DATA_PAGE_2, permissions: [] },
  { path: ROUTES.REPORT, permissions: [] },
  { path: ROUTES.TEMP_REPORT_PAGE, permissions: [] },
  { path: ROUTES.COMPANIES, permissions: ["company:view"] },
  { path: ROUTES.ACCOUNTS, permissions: ["user:view"] },
  { path: ROUTES.ROLES, permissions: ["user_role:view"] },
  { path: ROUTES.PERMISSIONS, permissions: ["user_permission:view"] },
  { path: ROUTES.LANGUAGES, permissions: ["language:view"] },
  { path: ROUTES.CONFIGURATIONS, permissions: ["event:config"] },
  { path: ROUTES[403], permissions: [] },
];
