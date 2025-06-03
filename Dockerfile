# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copy application code
COPY . .

# Set environment variables
ENV NODE_ENV=production \
    PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/ || exit 1

# Expose port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
