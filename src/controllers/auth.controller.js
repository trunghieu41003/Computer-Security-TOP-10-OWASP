// src/controller/UserController.js
const usermodel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Xử lý đăng ký người dùng
const signUp = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Kiểm tra xem email đã tồn tại hay chưa
        const existingUser = await usermodel.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        // Mã hóa mật khẩu
        //const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const newUser = await usermodel.createUser({
            email, password
        });

        res.status(201).json({ message: 'Đăng ký thành công', newUser });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi đăng ký', error: error.message });
    }
};

// Xử lý đăng nhập
const logIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Kiểm tra xem email có tồn tại không
        const user = await usermodel.findUserByEmail(email, password);

        // Kiểm tra nếu không tìm thấy người dùng
        if (user.length <= 0) {
            return res.status(404).json({ message: 'Email không tồn tại hoặc mật khẩu sai' });
        }

        // // Kiểm tra mật khẩu
        // const validPassword = await bcrypt.compare(password, user.password);
        // if (!validPassword) {
        //     return res.status(401).json({ message: 'Mật khẩu không đúng' });
        // }
        // Tạo token hoặc session
        const token = jwt.sign({ userId: user.user_id, email: user.email }, 'secret_key', { expiresIn: '1h' });

        res.status(200).json({ message: 'Đăng nhập thành công', token });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi đăng nhập', error: error.message });
    }
};

// Xử lý đăng xuất
const logout = (req, res) => {
    // Xóa session
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi đăng xuất' });
        }
        res.status(200).json({ message: 'Đăng xuất thành công' });
    });
};

const authenticateAdmin = (req, res, next) => {
    // Assume the JWT is passed in Authorization header as Bearer token
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token not provided' });

    // Verify token and check if the user is an admin
    jwt.verify(token, 'secret_key', (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        if (user.role !== 'admin') return res.status(403).json({ message: 'Access denied: Admins only' });

        req.user = user; // Attach user info to request object
        next();
    });
};
const authenticateUser = async (req, res, next) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    try {
        const user = jwt.verify(token, 'secret_key');
        req.user = user; // Attach user info to the request
        next(); // Proceed to the next middleware
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};


module.exports = {
    signUp,
    logIn,
    logout,
    authenticateAdmin,
    authenticateUser
};
