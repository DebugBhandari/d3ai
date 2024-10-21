# Use Node.js official image
FROM node:20

# Set working directory
WORKDIR /app
VOLUME ["/app"]
# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3001
EXPOSE 3002

# Start the application
CMD ["node", "server.js"]  # Adjust the entry point file as necessary