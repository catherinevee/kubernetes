# Build stage for React frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json /app/frontend
RUN npm install
COPY frontend/ /app/frontend
EXPOSE 443 31916
CMD [ "npm", "run", "dev" ]