FROM node:26.13.0-bookworm-slim AS base

FROM base AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN npm install --global --allow-scripts=pnpm pnpm@12.15.0
RUN pnpm install --frozen-lockfile
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

ARG NEXT_PUBLIC_APP_URL=http://127.0.0.1:3001
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
# Synthetic build-only values; runtime credentials must be supplied separately.
RUN AUTH_SECRET=container-build-only-not-a-real-secret \
    AUTH_GOOGLE_ID=container-build-only-google-id \
    AUTH_GOOGLE_SECRET=container-build-only-google-secret \
    RESEND_API_KEY=re_container_build_only_not_a_real_key \
    DRIZZLE_DATABASE_URL=postgresql://build:build@127.0.0.1:5432/build \
    TMDB_API_KEY=container-build-only-not-a-real-key \
    TYPESENSE_HOST=127.0.0.1 TYPESENSE_PORT=8108 TYPESENSE_PROTOCOL=http \
    TYPESENSE_API_KEY=container-build-only-not-a-real-key \
    GOOGLE_TAG_MANAGER_ID=GTM-CONTAINER-BUILD \
    pnpm run build

FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3001

ENV PORT=3001

ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
