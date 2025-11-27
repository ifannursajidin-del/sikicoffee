// API URL (ganti sesuai hosting API Anda)
const API_LOGIN = "https://sikicoffee.rf.gd/api/auth/login.php";

// Ambil elemen input
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const statusBox = document.getElementById("login-status");

// Fungsi login
async function login() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    statusBox.innerHTML = "Memproses...";
    statusBox.style.color = "gold";

    if (!username || !password) {
        statusBox.innerHTML = "Username & Password wajib diisi.";
        statusBox.style.color = "red";
        return;
    }

    try {
        const response = await fetch(API_LOGIN, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (result.status === true) {
            statusBox.innerHTML = "Login berhasil!";
            statusBox.style.color = "lightgreen";

            // Simpan token login
            localStorage.setItem("token", result.token);

            // Pindah ke dashboard
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);

        } else {
            statusBox.innerHTML = "Login gagal! " + result.message;
            statusBox.style.color = "red";
        }

    } catch (error) {
        statusBox.innerHTML = "Gagal menghubungi server!";
        statusBox.style.color = "red";
    }
}

loginBtn.addEventListener("click", login);
