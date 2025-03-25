# frontend/Dockerfile
# ใช้ Node.js image
FROM node:18

# สร้าง directory สำหรับโค้ด
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดไปยัง container
COPY . .

# # คอมไพล์ React app
# RUN npm run build

# เปิดพอร์ตที่ใช้
EXPOSE 3000

# รันแอปพลิเคชัน
CMD ["npm", "run", "dev"]

