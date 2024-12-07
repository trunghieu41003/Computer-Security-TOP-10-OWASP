
const express = require('express')
const userRoutes = require('./routes/auth.route'); // Import routes cho người dùng
const authMiddleware = require('./midddleware/jwt');
const path = require('path');
const app = express()
require('dotenv').config();
const cors = require('cors'); // Import cors
app.use(cors());

// Middleware để phân tích cú pháp JSON
app.use(express.json());

// Thiết lập thư mục tĩnh cho các file HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'public')));


// Sử dụng routes cho người dùng
app.use('/', userRoutes); // Tất cả các route liên quan đến người dùng sẽ bắt đầu với /users

// Lắng nghe trên cổng 3000 và hiển thị thông báo xác nhận
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});



