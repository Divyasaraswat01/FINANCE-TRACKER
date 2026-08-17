const storedUser =
    localStorage.getItem("user");


if (!storedUser) {

    window.location.href =
        "login.html";

} else {

    const user =
        JSON.parse(storedUser);


    document.getElementById(
        "profileName"
    ).textContent =
        user.name || "User";


    document.getElementById(
        "profileEmail"
    ).textContent =
        user.email || "";


    document.getElementById(
        "profileId"
    ).textContent =
        user.id || "";

}


// Logout function

function logout() {

    localStorage.removeItem("user");


    localStorage.setItem(
        "logoutMessage",
        "You have been logged out successfully!"
    );


    window.location.href =
        "login.html";

}


// Sidebar logout

const logoutLink =
    document.getElementById(
        "logoutLink"
    );


if (logoutLink) {

    logoutLink.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            logout();

        }
    );

}


// Profile logout button

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            logout();

        }
    );

}