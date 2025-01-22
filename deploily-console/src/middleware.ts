import {createI18nMiddleware} from "next-international/middleware";
import {NextRequest} from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fr"],
  defaultLocale: "en",
});

// export default async function middleware(request: NextRequest) {
//   const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
//   const cspHeader = `
//     default-src 'self' ;
//     script-src 'self' 'unsafe-eval' 'unsafe-inline';
//     style-src 'self' 'unsafe-inline';
//     img-src * 'self' data: https:;
//     font-src 'self';
//     object-src 'none';
//     base-uri 'self';
//     form-action 'self';
//     frame-ancestors 'none';
//     block-all-mixed-content;
//     upgrade-insecure-requests;
//     `

//   // Replace newline characters and spaces
//   const contentSecurityPolicyHeaderValue = cspHeader
//     .replace(/\s{2,}/g, " ")
//     .trim();

//   const requestHeaders = new Headers(request.headers);
//   requestHeaders.set("x-nonce", nonce);

//   // requestHeaders.set(
//   //   "Content-Security-Policy",
//   //   contentSecurityPolicyHeaderValue
//   // );

//   // Step 1: Use the incoming request (example)
//   const defaultLocale = request.headers.get("x-your-custom-locale") || "en";

//   // Step 2: Create and call the next-intl middleware (example)
//   const handleI18nRouting = createIntlMiddleware({
//     defaultLocale: "en",
//     locales,
//     pathnames,
//     localePrefix,
//   });
//   const response = handleI18nRouting(request);

//   // Step 3: Alter the response (example)
//   response.headers.set("x-your-custom-locale", defaultLocale);
//   // response.headers.set(
//   //   "Content-Security-Policy",
//   //   contentSecurityPolicyHeaderValue
//   // );
//   response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
//   response.headers.set("X-Frame-Options", "DENY");
//   response.headers.set("X-Content-Type-Options", "nosniff");
//   response.headers.set("Strict-Transport-Security", "max-age=63072000");
//   response.headers.set("X-XSS-Protection", "  1; mode=block");
//   return response;
// }
export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
