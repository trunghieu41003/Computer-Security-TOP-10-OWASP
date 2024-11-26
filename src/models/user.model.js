// src/model/foodModel.js
const connection = require('../config/database');

const createUser = (userData) => {
    return new Promise((resolve, reject) => {
        const { email, password } = userData;
        connection.query(
            'INSERT INTO User (email, password) VALUES (?, ?)',
            [email, password],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve({ results }); // Trả về dữ liệu người dùng mới
            }
        );
    });
};


// Prevent SQL Injection
const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM User WHERE email = ?', [email], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0]);
        });
    });
};


// SQL Injection
// const findUserByEmail = (email, password) => {
//     return new Promise((resolve, reject) => {
//         // Truy vấn trực tiếp ghép chuỗi, không sử dụng `?` hoặc bất kỳ phương thức bảo mật nào
//         const query = `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`;

//         connection.query(query, (err, results) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(results);
//         });
//     });
// };


// (A04) update login attempts function 
// const updateLoginAttempts = (email, attempts, lockedUntil) => {
//     return new Promise((resolve, reject) => {
//         connection.query(
//             'UPDATE User SET login_attempts = ?, locked_until = ? WHERE email = ?',
//             [attempts, lockedUntil, email],
//             (err, results) => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 resolve(results);
//             }
//         );
//     });
// };

module.exports = {
    createUser,
    findUserByEmail,
    // updateLoginAttempts,
};
