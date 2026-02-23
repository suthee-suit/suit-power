let isLoginMode = true;

function toggleMode(){
    const title = document.getElementById("formTitle");
    const toggleText = document.querySelector(".toggle");
    const button = document.querySelector("button");
    const error = document.getElementById("errorMsg");

    error.innerText = "";

    if(isLoginMode){
        title.innerText = "สมัครสมาชิก";
        button.innerText = "สมัครสมาชิก";
        toggleText.innerText = "มีบัญชีแล้ว? เข้าสู่ระบบ";
        isLoginMode = false;
    }else{
        title.innerText = "เข้าสู่ระบบ";
        button.innerText = "เข้าสู่ระบบ";
        toggleText.innerText = "ยังไม่มีบัญชี? สมัครสมาชิก";
        isLoginMode = true;
    }
}

function handleAuth(){
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("errorMsg");

    if(!username || !password){
        error.innerText = "กรุณากรอกข้อมูลให้ครบ";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if(isLoginMode){
        // LOGIN
        const user = users.find(u => u.username === username && u.password === password);

        if(!user){
            error.innerText = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));
        redirectAfterLogin();

    }else{
        // REGISTER
        const existingUser = users.find(u => u.username === username);
        if(existingUser){
            error.innerText = "ชื่อผู้ใช้นี้ถูกใช้งานแล้ว";
            return;
        }

        const newUser = { username, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("สมัครสมาชิกสำเร็จ กรุณาเข้าสู่ระบบ");
        toggleMode();
    }
}

function redirectAfterLogin(){
    const redirectPage = localStorage.getItem("redirectAfterLogin");

    if(redirectPage){
        localStorage.removeItem("redirectAfterLogin");
        window.location.href = redirectPage;
    }else{
        window.location.href = "index.html";
    }
}