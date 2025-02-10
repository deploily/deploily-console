# STAGE 1 : Build dependencies
FROM node:18-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile -legacy-peer-deps

# STAGE 2: Build the App
FROM node:18-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build 

# STAGE 3: Create a clean production image - only take pruned assets
FROM node:18-alpine AS runner

WORKDIR /www

# We set the NODE_ENV to production to make sure that the NextJS app runs in production mode
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# We add a non-root user to run the app for security reasons
RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 app

# We copy the built NextJS app assets from the builder stage
# NextJS produces a backend server and a frontend app
COPY --chown=app:app --from=builder /app/.next/standalone ./
COPY --chown=app:app --from=builder /app/.next/static ./.next/static
COPY --chown=app:app --from=builder /app/public ./public

USER app

# You should choose a port that is supported by your cloud provider
ENV PORT 3000

# Expose the port to the outside world
EXPOSE 3000

# Finally, we run the NextJS app
CMD ["node", "server.js"]

