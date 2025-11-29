# Use Node LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of backend code
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
