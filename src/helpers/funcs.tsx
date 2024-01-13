import { AppRoutes, AppRoutesPermissions, ROUTERS_BREADCRUMBS, ROUTES } from "../constants/routes";
import { SideBarItemType } from "../models/SideBar";
import { StyledSeePassword } from "../styles/commons";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { checkPermission } from "../utils/common";

export function checkCurrentPath(pathname: string) {
  const matchCurrentPage: string[] = [];

  const keys = Object.keys(ROUTES) as Array<keyof typeof ROUTES>;
  keys.forEach((key) => {
    if (pathname.includes(ROUTES[key])) {
      matchCurrentPage.push(ROUTES[key]);
    }
  });

  const currentPage =
    matchCurrentPage.length > 0
      ? matchCurrentPage.reduce(
          (routeA, routeB) => (routeA.length > routeB.length ? routeA : routeB),
          matchCurrentPage[0],
        )
      : undefined;
  return currentPage;
}

export function generateBreadcrumbs() {
  if (typeof window !== "undefined") {
    const pathnames = window.location.pathname.split("/").filter((path: string) => path !== "");

    const breadcrumbsURLs = [];

    for (let i = 0; i < pathnames.length; i++) {
      const href = `/${pathnames.slice(0, i + 1).join("/")}`;

      const route = ROUTERS_BREADCRUMBS.find(
        (item) => href !== ROUTES.DATA && href !== ROUTES.REPORT && href === item.slug,
      );

      if (route) {
        breadcrumbsURLs.push(route);
      }
    }

    return breadcrumbsURLs;
  }

  return [];
}

export function mergePermissionFromRoles(roles: { [x: string]: string[] }) {
  let tempPermissionsList: string[] = [];

  for (const [key, value] of Object.entries(roles)) {
    tempPermissionsList = [...tempPermissionsList, ...value];
  }

  let permissionsList: string[] = [];

  for (let i = 0; i < tempPermissionsList.length; i++) {
    const permission = tempPermissionsList[i];
    if (!permissionsList.includes(permission)) {
      permissionsList.push(permission);
    }
  }

  return permissionsList;
}

export function getAppRoutesBaseOnPermission(userPermissions: string[]) {
  let appBarFollowPermission: SideBarItemType[] = [];

  for (const route of AppRoutes) {
    if (!route?.group) {
      if (route.permissions.length === 0) {
        appBarFollowPermission.push(route);
      } else {
        const hasPermission = route.permissions.every((permission) => checkPermission(userPermissions, permission));
        if (hasPermission) {
          appBarFollowPermission.push(route);
        }
      }
    } else {
      let tempGroupRoute: SideBarItemType = {
        key: route.key,
        permissions: route.permissions,
        group: {
          name: route.group.name,
          child: [],
        },
      };

      for (const subRoute of route.group.child) {
        if (!subRoute.child) {
          const hasPermission = subRoute.permissions.every((permission) =>
            checkPermission(userPermissions, permission),
          );

          if (hasPermission) {
            if (tempGroupRoute.group?.child) {
              tempGroupRoute.group.child.push(subRoute);
            }
          }
        } else {
          let childSubRoutes: SideBarItemType[] = [];
          for (const childOfSubRoute of subRoute.child) {
            const hasPermission = childOfSubRoute.permissions.every((permission) =>
              checkPermission(userPermissions, permission),
            );

            if (hasPermission) {
              childSubRoutes.push(childOfSubRoute);
            }
          }

          if (childSubRoutes.length > 0) {
            const tempSubRoute: SideBarItemType = {
              path: subRoute.path,
              key: subRoute.key,
              permissions: subRoute.permissions,
              sideBarProps: subRoute.sideBarProps,
              child: childSubRoutes,
            };

            if (tempGroupRoute.group?.child) {
              tempGroupRoute.group?.child.push(tempSubRoute);
            }
          }
        }
      }

      if (tempGroupRoute.group?.child && tempGroupRoute.group.child.length > 0) {
        appBarFollowPermission.push(tempGroupRoute);
      }
    }
  }

  return appBarFollowPermission;
}

export function checkPermissionForAccessSpecificPage(userPermissions: string[], pathname: string) {
  for (const route of AppRoutesPermissions) {
    if (route.path === pathname) {
      const hasPermission = route.permissions.every((permission) => checkPermission(userPermissions, permission));
      if (hasPermission) {
        return true;
      }
      return false;
    }
  }
  return true;
}
