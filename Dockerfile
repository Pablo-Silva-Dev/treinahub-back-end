# ---------- build stage ----------
FROM node:20-bookworm-slim AS build
WORKDIR /app

# Tools needed to compile native deps and for prisma in build
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# Install full deps (incl. dev) for build & prisma generate
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
# Generate Prisma Client for multiple targets (schema should declare binaryTargets)
RUN npx prisma generate
RUN npm run build


# ---------- runtime stage ----------
FROM node:20-bookworm-slim AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3334

# Runtime deps: OpenSSL for Prisma + ffmpeg (includes ffprobe)
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl ca-certificates ffmpeg \
 && rm -rf /var/lib/apt/lists/*

# Install only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# App artifacts
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

# Prisma runtime bits (engines + client)
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=build /app/node_modules/@prisma /app/node_modules/@prisma

# Prisma CLI so you can run migrations inside the container
COPY --from=build /app/node_modules/prisma /app/node_modules/prisma
COPY --from=build /app/node_modules/.bin/prisma /usr/local/bin/prisma

EXPOSE 3334

CMD ["node", "dist/main"]
