# Use the Zenika image with Puppeteer support
FROM zenika/alpine-chrome:with-puppeteer

WORKDIR /usr/src/app

# Switch to root to install dependencies and build the project
USER root

# Copy package.json and install dependencies
COPY --chown=chrome:chrome package*.json ./
COPY . .

# Ensure that the chrome user has the right permissions for the build directory
RUN chown -R chrome:chrome /usr/src/app

# Run npm install as root
RUN npm install

# Ensure permissions are correct for the build folder
RUN mkdir -p /usr/src/app/build && chown -R chrome:chrome /usr/src/app/build

# Switch back to the chrome user to run the build
USER chrome

# Compile TypeScript code to JavaScript
RUN npm run build

# Set up environment variable (Redis URL)
ENV REDIS_URL=rediss://default:dce4434ca00845d09c4c6e2fe9bd5a9e@gusc1-precious-cicada-30864.upstash.io:30864

# Expose the application port (3000 or 8080)
EXPOSE 3000

# Start the bot in production mode after compiling
CMD ["npm", "run", "start"]
