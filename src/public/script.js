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
            localStorage.setItem('jwtToken',data.token)
            window.location.href="user.html"
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
// Toggle between login and signup forms
document.getElementById('signupLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'flex';
    document.getElementById('loginTab').classList.remove('active');
    document.getElementById('signupTab').classList.add('active');
});

document.getElementById('loginLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'flex';
    document.getElementById('signupTab').classList.remove('active');
    document.getElementById('loginTab').classList.add('active');
});

document.getElementById('loginTab').addEventListener('click', function() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'flex';
    this.classList.add('active');
    document.getElementById('signupTab').classList.remove('active');
});

document.getElementById('signupTab').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'flex';
    this.classList.add('active');
    document.getElementById('loginTab').classList.remove('active');
});

// Hàm cập nhật tiêu đề của thẻ h1
function updateFormTitle(title) {
    document.getElementById('formTitle').textContent = title;
}

// Toggle giữa các form login và signup
document.getElementById('signupLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'flex';
    document.getElementById('loginTab').classList.remove('active');
    document.getElementById('signupTab').classList.add('active');
    updateFormTitle("Signup Form"); // Cập nhật thẻ h1
});

document.getElementById('loginLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'flex';
    document.getElementById('signupTab').classList.remove('active');
    document.getElementById('loginTab').classList.add('active');
    updateFormTitle("Login Form"); // Cập nhật thẻ h1
});

document.getElementById('loginTab').addEventListener('click', function() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'flex';
    this.classList.add('active');
    document.getElementById('signupTab').classList.remove('active');
    updateFormTitle("Login Form"); // Cập nhật thẻ h1
});

document.getElementById('signupTab').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'flex';
    this.classList.add('active');
    document.getElementById('loginTab').classList.remove('active');
    updateFormTitle("Signup Form"); // Cập nhật thẻ h1
});
