import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { Languages } from "./constants/enum";
import { PRIVATE_ROUTES, ROUTES } from "./constants/routes";
import { locales } from "./i18n-configurations/config";
import { checkPermissionForAccessSpecificPage } from "./helpers/funcs";
import { removeLocaleFromPathname } from "./utils/common";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: Languages.English,
  localeDetection: false,
  localePrefix: "as-needed",
});

function isMatchPrivateRoute(path: string) {
  let newPath = removeLocaleFromPathname(path);

  return PRIVATE_ROUTES.some((substr) => newPath.startsWith(substr));
}

export default authMiddleware({
  beforeAuth: (req) => {
    return intlMiddleware(req);
  },
  afterAuth: (auth, req, evt) => {
    const { pathname } = req.nextUrl;

    if (pathname === "/") {
      return NextResponse.redirect(new URL(ROUTES.DASHBOARD, req.url));
    }

    const token = req.cookies.get("authorization");
    const userPermissions = req.cookies.get("userPermissions");

    if (!token?.value && isMatchPrivateRoute(pathname)) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
    }

    if (token?.value && !isMatchPrivateRoute(pathname)) {
      return NextResponse.redirect(new URL(ROUTES.DASHBOARD, req.url));
    }

    // if (userPermissions?.value) {
    //   const parseUserPermissions = JSON.parse(userPermissions.value) as string[];
    //   const urlWithoutLocale = removeLocaleFromPathname(pathname);

    //   const hasPermissionAccessCurrPage = checkPermissionForAccessSpecificPage(parseUserPermissions, urlWithoutLocale);

    //   if (!hasPermissionAccessCurrPage) {
    //     return NextResponse.redirect(new URL(ROUTES[403], req.url));
    //   }
    // }

    return NextResponse.next();
  },
});

export const config = {
  // Match only internationalized pathnames
  matcher: "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
};
