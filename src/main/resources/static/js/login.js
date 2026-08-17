const loginForm = document.getElementById("loginForm");

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");


// Show / hide password

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        togglePassword.textContent = "🙈";

    } else {

        passwordInput.type = "password";
        togglePassword.textContent = "👁️";

    }

});


// Login form

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;


    try {

        const response = await fetch(
            "http://localhost:8080/api/users/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );


        if (response.ok) {

            const user = await response.json();

            console.log(
                "Login successful:",
                user
            );


            // Save user information

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );


            // Save notification for dashboard

            localStorage.setItem(
                "loginMessage",
                "Login successful!"
            );


            // Go to dashboard

            window.location.href =
                "dashboard.html";


        } else {

            showNotification(
                "Invalid email or password.",
                "error"
            );

        }


    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        showNotification(
            "Cannot connect to the server. Make sure Spring Boot is running.",
            "error"
        );

    }

});
const registerMessage =
    localStorage.getItem("registerMessage");

if (registerMessage) {

    showNotification(
        registerMessage,
        "success"
    );

    localStorage.removeItem("registerMessage");

}
const logoutMessage =
    localStorage.getItem("logoutMessage");

if (logoutMessage) {

    showNotification(
        logoutMessage,
        "success"
    );

    localStorage.removeItem("logoutMessage");

}