# Stage 1: Build React App
FROM node:20-alpine AS build
WORKDIR /app

# Cài đặt dependencies
COPY package*.json ./
RUN npm install

# Copy mã nguồn và Build
COPY . .
# Thiết lập biến môi trường cho API URL (có thể ghi đè lúc build)
ARG VITE_API_URL=http://localhost:5181
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Stage 2: Serve với Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Copy file config nginx để hỗ trợ React Router (Single Page App)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
