FROM node:18-alpine
# Chuyển thư mục làm việc
WORKDIR /usr/src/app
# Copy file package và cài đặt dependencies
COPY package*.json ./
RUN npm install
# Copy toàn bộ source code
COPY . .
# Hardening: Sử dụng non-root user có sẵn trong image node
USER node
# Expose port
EXPOSE 3000
CMD ["npm", "start"]