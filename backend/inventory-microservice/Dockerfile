# Node image to use
FROM node:16

# Directory where we run all the commands
WORKDIR /inventory-app

# Copy the package.json file to out image's filesystem
COPY package.json .

# Run a npm install command based on an argument
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

# Copy the rest of our source code
COPY . ./

# Set and expose port env
ENV PORT 3000
EXPOSE $PORT

# Start the app
CMD [ "node", "server.js" ]
