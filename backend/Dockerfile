FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of the application
COPY . .



# Expose port 3000 (the default port for serve)
EXPOSE 5000

# Start the application
CMD ["npm","start"]
