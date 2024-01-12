import { ROUTERS_BREADCRUMBS, ROUTES } from "../constants/routes";
import { StyledSeePassword } from "../styles/commons";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
