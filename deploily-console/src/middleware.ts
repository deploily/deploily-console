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
      authorized: ({ token }) => {
        if (!token) return false;
        // Block if refresh error was flagged
        if ((token as any).error === "RefreshAccessTokenError") return false;
        const expiresAt = (token as any).expiresAt;
        if (typeof expiresAt === "number" && Date.now() >= expiresAt * 1000) {
          return false;
        }
        const accessToken = (token as any).accessToken as string | undefined;
        if (!accessToken || accessToken.length < 10) return false;
        try {
          const parts = accessToken.split(".");
          if (parts.length !== 3) return false;
          const payload = JSON.parse(
            Buffer.from(parts[1], "base64url").toString("utf-8")
          );
          const issOk =
            !process.env.KEYCLOAK_ISSUER ||
            payload.iss === process.env.KEYCLOAK_ISSUER;
          const aud = payload.aud;
          const expectedAud = process.env.KEYCLOAK_CLIENT_ID;
          const audOk =
            !expectedAud ||
            aud === expectedAud ||
            (Array.isArray(aud) && aud.includes(expectedAud));
          const expOk = typeof payload.exp === "number"
            ? Date.now() < payload.exp * 1000
            : true;
          return issOk && audOk && expOk;
        } catch {
          return false;
        }
      },
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


  const externalSrc = `${process.env.NEXT_PUBLIC_BASE_URL || ""}`.trim();

  const requestHeaders = new Headers(req.headers);
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  requestHeaders.set("x-nonce", nonce);

  const contentSecurityPolicyHeaderValue = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    `connect-src 'self' ${externalSrc}`,
    "upgrade-insecure-requests",
  ]
    .join("; ")
    .replace(/\s{2,}/g, " ")
    .trim();

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
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains"
  );
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()"
  );
  return response;
}



export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
