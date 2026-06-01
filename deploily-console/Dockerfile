# STAGE 1: Build dependencies
FROM node:18-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile --legacy-peer-deps

# STAGE 2: Build the App
FROM node:18-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ✅ ADD THESE 3 LINES
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_PAYMENT_ENABLED
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_PAYMENT_ENABLED=$NEXT_PUBLIC_PAYMENT_ENABLED
ENV NEXTAUTH_URL=$NEXTAUTH_URL

RUN npm run build

# STAGE 3: Production image
FROM node:18-alpine AS runner

WORKDIR /www

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 app

COPY --chown=app:app --from=builder /app/.next/standalone ./
COPY --chown=app:app --from=builder /app/.next/static ./.next/static
COPY --chown=app:app --from=builder /app/public ./public

USER app

ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]