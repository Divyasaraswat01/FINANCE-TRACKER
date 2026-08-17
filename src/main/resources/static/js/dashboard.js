// Check logged-in user

const storedUser = localStorage.getItem("user");

if (!storedUser) {

    window.location.href = "login.html";

} else {

    const user = JSON.parse(storedUser);

    loadDashboard(user.id);

}


// Dashboard elements

const totalBalance =
    document.getElementById("totalBalance");

const totalIncome =
    document.getElementById("totalIncome");

const totalExpense =
    document.getElementById("totalExpense");


// Load dashboard data

async function loadDashboard(userId) {

    try {

        const response = await fetch(
            `http://localhost:8080/api/transactions/user/${userId}`
        );

        if (!response.ok) {

            throw new Error(
                "Unable to load transactions"
            );

        }

        const transactions =
            await response.json();


        let income = 0;
        let expense = 0;


        transactions.forEach(transaction => {

            if (transaction.type === "INCOME") {

                income +=
                    Number(transaction.amount);

            }


            if (transaction.type === "EXPENSE") {

                expense +=
                    Number(transaction.amount);

            }

        });


        const balance =
            income - expense;


        totalIncome.textContent =
            `₹${income.toLocaleString("en-IN")}`;

        totalExpense.textContent =
            `₹${expense.toLocaleString("en-IN")}`;

        totalBalance.textContent =
            `₹${balance.toLocaleString("en-IN")}`;


    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

        totalIncome.textContent = "₹0";
        totalExpense.textContent = "₹0";
        totalBalance.textContent = "₹0";

    }

}


// Logout

const logoutLink =
    document.getElementById("logoutLink");


if (logoutLink) {
    logoutLink.addEventListener("click", function (event) {

    event.preventDefault();

    localStorage.removeItem("user");

    localStorage.setItem(
        "logoutMessage",
        "You have been logged out successfully!"
    );

    window.location.href = "login.html";

});

    
    

}
const loginMessage =
    localStorage.getItem("loginMessage");

if (loginMessage) {

    showNotification(
        loginMessage,
        "success"
    );

    localStorage.removeItem("loginMessage");

}