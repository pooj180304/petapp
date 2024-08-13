FROM node:14-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy app files
COPY . .

# Build the app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]