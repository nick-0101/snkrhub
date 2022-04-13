# Node image to use
FROM node:16-alpine

# Directory where we run all the commands
WORKDIR /usr/local/apps/inventory-app

# Copy the package.json file to out image's filesystem
COPY package.json ./

# Run a npm install command based on node env
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

# Set working directory to /dev
WORKDIR /usr/local/apps/inventory-app/dev

# Copy tsconfig
COPY tsconfig.json ./

# Copy the rest of our source code
COPY src ./src

ENV PORT 3000
EXPOSE $PORT

CMD ["node", "server.ts"]