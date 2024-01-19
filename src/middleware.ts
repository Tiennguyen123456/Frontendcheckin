// NOTE: all file import in middleware file should not have relative import to MUI or
// somethings only available in client side.
// ex: you want to import a file to middleware.ts file but in it has a import from MUI
// or somethings only available in client side ==> this will cause build failed
// ==> because middleware in run in server-side

import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { Languages } from "./constants/enum";
import { PRIVATE_ROUTES, ROUTES } from "./constants/routes";
import { checkPermissionForAccessSpecificPage } from "./helpers/middleware";
import { locales } from "./i18n-configurations/config";
import { removeLocaleFromPathname } from "./utils/common";

function isMatchPrivateRoute(path: string) {
  let newPath = removeLocaleFromPathname(path);

  return PRIVATE_ROUTES.some((substr) => newPath.startsWith(substr));
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  const token = request.cookies.get("authorization");
  const userPermissions = request.cookies.get("userPermissions");

  if (!token?.value && isMatchPrivateRoute(pathname)) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  if (token?.value && !isMatchPrivateRoute(pathname)) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  if (userPermissions?.value) {
    const parseUserPermissions = JSON.parse(userPermissions.value) as string[];
    const urlWithoutLocale = removeLocaleFromPathname(pathname);

    const hasPermissionAccessCurrPage = checkPermissionForAccessSpecificPage(parseUserPermissions, urlWithoutLocale);

    if (!hasPermissionAccessCurrPage) {
      return NextResponse.redirect(new URL(ROUTES[403], request.url));
    }
  }

  const handleI18nRouting = createMiddleware({
    // A list of all locales that are supported
    locales: locales,

    // Used when no locale matches
    defaultLocale: Languages.English,
    localeDetection: false,
    localePrefix: "as-needed",
  });

  const response = handleI18nRouting(request);
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
};
