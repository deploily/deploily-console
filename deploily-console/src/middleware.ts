import {createI18nMiddleware} from "next-international/middleware";
import {NextRequest} from "next/server";
import { withAuth } from "next-auth/middleware";

export const locales = ["en", "fr"] as const;

const I18nMiddleware = createI18nMiddleware({
  locales: locales,
  defaultLocale: "en",
});


const authMiddleware = withAuth(
  function onSuccess(req) {
    return I18nMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/",
    },
  }
);

export default function middleware(req: NextRequest) {
  const excludePattern = "^(/(" + locales.join("|") + "))?/portal/?.*?$";
  const publicPathnameRegex = RegExp(excludePattern, "i");
  const isPublicPage = !publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return I18nMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}


export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
