# Use Node
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy frontend code
COPY . .

# Expose port
EXPOSE 3000

# Start React development server
CMD ["npm", "start"]
