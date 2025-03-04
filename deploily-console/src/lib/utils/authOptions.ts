import { AuthOptions, TokenSet } from "next-auth";
import { JWT } from "next-auth/jwt";
import KeycloakProvider from "next-auth/providers/keycloak";

function requestRefreshOfAccessToken(token: JWT) {
    // Check if the refreshToken is a string before passing it
    if (typeof token.refreshToken !== 'string') {
        throw new Error('Invalid refresh token');
    }
    return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: process.env.KEYCLOAK_CLIENT_ID,
            client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken,  // Ensure this is a string
        }),
        method: "POST",
        cache: "no-store"
    });
}

export const authOptions: AuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
            issuer: process.env.KEYCLOAK_ISSUER
        })
    ],
    session: {
        maxAge: 60 * 30 // 30 minutes
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.idToken = account.id_token;
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.expiresAt = account.expires_at;
                return token;
            }
            // Check if the token is near expiry (less than 1 minute)
            const expiresAt = token.expiresAt;
            if (typeof expiresAt === 'number' && Date.now() < (expiresAt * 1000 - 60 * 1000)) {

                return token; // Return token if it is still valid
            } else {
                try {
                    // Refresh the token
                    const response = await requestRefreshOfAccessToken(token);
                    const tokens: TokenSet = await response.json();

                    if (!response.ok) throw tokens;

                    const expiresIn = typeof tokens.expires_in === 'number' ? tokens.expires_in : 3600;

                    const updatedToken: JWT = {
                        ...token,
                        idToken: tokens.id_token,
                        accessToken: tokens.access_token,
                        expiresAt: Math.floor(Date.now() / 1000 + expiresIn),
                        refreshToken: tokens.refresh_token ?? token.refreshToken,
                    };

                    return updatedToken; // Return the updated token
                } catch (error) {
                    console.error("Error refreshing access token", error);
                    // Instead of returning null, return token with an error flag
                    return {
                        ...token,
                        error: "RefreshAccessTokenError",
                        accessToken: null, // Invalidate token
                    };
                }
            }
        },

        async session({ session, token }: any) {
            // Assign the access token to the session object
            if (!token) {
                return null; // Logout user
            }
            if (token?.accessToken) {
                session.accessToken = token.accessToken as string;
                if (session?.user) {
                    // Assign user id to the session.user object
                    session.user.id = token.sub;
                }
            }
            return session;
        },
    }
};

