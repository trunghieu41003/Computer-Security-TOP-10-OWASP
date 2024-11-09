// Hàm gọi API đăng ký
async function signUp(event) {
    event.preventDefault(); // Ngăn form reload trang

    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const response = await fetch('http://localhost:3000/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Đăng ký thành công!');
        } else {
            alert(`Đăng ký thất bại: ${data.message}`);
        }
    } catch (error) {
        console.error('Lỗi:', error);
    }
}

// Hàm gọi API đăng nhập
async function logIn(event) {
    event.preventDefault(); // Ngăn form reload trang

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Đăng nhập thành công!');
        } else {
            alert(`Đăng nhập thất bại: ${data.message}`);
        }
    } catch (error) {
        console.error('Lỗi:', error);
    }
}

// Gán sự kiện submit cho form đăng ký và đăng nhập
document.getElementById('signupForm').addEventListener('submit', signUp);
document.getElementById('loginForm').addEventListener('submit', logIn);
