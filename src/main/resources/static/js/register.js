const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check whether passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        if (response.ok) {

            const user = await response.json();

            console.log("Registered user:", user);

            localStorage.setItem(
    "registerMessage",
    "Registration successful!"
);

window.location.href = "login.html";

            window.location.href = "login.html";

        } else {

            console.error("Registration failed:", await response.text());

            alert("Registration failed!");

        }

    } catch (error) {

        console.error("Error:", error);

        alert("Cannot connect to the server. Please make sure Spring Boot is running.");

    }
});