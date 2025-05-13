// types/node-env.d.ts
declare namespace NodeJS {
    export interface ProcessEnv {
        KEYCLOAK_CLIENT_ID: string
        KEYCLOAK_CLIENT_SECRET: string
        KEYCLOAK_ISSUER: string
        NEXT_PUBLIC_SITE_KEY: string
        NEXT_PUBLIC_BASE_URL :string
        BANK_ACCOUNT_HOLDER_NAME: string
        BANK_ACCOUNT_HOLDER_ADDRESS: string
        BANK_ACCOUNT_BANK_NAME: string
        BANK_ACCOUNT_BANK_AGENCY: string
        BANK_ACCOUNT_NUMBER: string
        NEXT_PUBLIC_PAYMENT_ENABLED: string
    }
}