import createMiddleware from "next-intl/middleware";
import { Languages } from "./constants/enum";
import { locales } from "./i18n-configurations/config";
import { NextRequest, NextResponse } from "next/server";
import { PRIVATE_ROUTES, ROUTES } from "./constants/routes";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

const intlMiddleware = createMiddleware({
	// A list of all locales that are supported
	locales: locales,

	// Used when no locale matches
	defaultLocale: Languages.English,
	localeDetection: false,
	localePrefix: "as-needed",
});

function checkIfStringStartsWith(str: string, arr: string[]) {
	return arr.some((substr) => str.startsWith(substr));
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

		const cookie = req.cookies.get("authorization");
		console.log("cookie: ", cookie);

		if (!cookie?.value && checkIfStringStartsWith(pathname, PRIVATE_ROUTES)) {
			return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
		}

		if (cookie?.value && !checkIfStringStartsWith(pathname, PRIVATE_ROUTES)) {
			return NextResponse.redirect(new URL(ROUTES.DASHBOARD, req.url));
		}

		return NextResponse.next();
	},
});

export const config = {
	// Match only internationalized pathnames
	// matcher: ["/((?!api|_next|.*\\..*).*)"],
	matcher: "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
};
