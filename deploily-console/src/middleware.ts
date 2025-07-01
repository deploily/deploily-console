import { withAuth } from "next-auth/middleware";
import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";

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
      signIn: "/auth/login",
    },
  }
);

export default async function middleware(req: NextRequest) {
  const excludePattern = "^(/(" + locales.join("|") + "))?/portal/?.*?$";
  const publicPathnameRegex = RegExp(excludePattern, "i");
  const isPublicPage = !publicPathnameRegex.test(req.nextUrl.pathname);


  const externalSrc = `${process.env.CSP_HEADER_DEFAULT_SRC || process.env.NEXT_PUBLIC_BASE_URL}`;

  const cspHeader = `
    default-src 'self' ${externalSrc};
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src * 'self' data: https:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    `
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(req.headers);
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  requestHeaders.set("x-nonce", nonce);


  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  let response;
  if (isPublicPage) {
    response = await I18nMiddleware(req);
  } else {
    response = await (authMiddleware as any)(req);
  }
  const defaultLocale = req.headers.get("x-your-custom-locale") || "en";

  response.headers.set("x-your-custom-locale", defaultLocale);
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Strict-Transport-Security", "max-age=63072000");
  response.headers.set("X-XSS-Protection", "  1; mode=block");
  return response;
}



export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
