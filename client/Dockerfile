FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# build the React app and serve it using serve for production (optional)
RUN npm run build

# For development, we want the dev server:
CMD ["npm","start"]

EXPOSE 3000
