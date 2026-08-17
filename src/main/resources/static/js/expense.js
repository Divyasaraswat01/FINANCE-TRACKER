const expenseForm =
    document.getElementById("expenseForm");

const expenseTableBody =
    document.getElementById("expenseTableBody");


const storedUser =
    localStorage.getItem("user");


if (!storedUser) {

    window.location.href = "login.html";

}


const user =
    JSON.parse(storedUser);


// ============================
// ADD EXPENSE
// ============================

expenseForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const expenseName =
            document
                .getElementById("expenseName")
                .value
                .trim();


        const category =
            document
                .getElementById("category")
                .value;


        const amount =
            Number(
                document
                    .getElementById("amount")
                    .value
            );


        const date =
            document
                .getElementById("date")
                .value;


        try {

            const response =
                await fetch(
                    "http://localhost:8080/api/transactions",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            amount: amount,

                            type: "EXPENSE",

                            category: category,

                            description: expenseName,

                            date: date,

                            user: {
                                id: user.id
                            }

                        })

                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to add expense"
                );

            }


            showNotification(
                "Expense added successfully!",
                "success"
            );


            expenseForm.reset();


            await loadExpenses();


        } catch (error) {

            console.error(
                "Expense error:",
                error
            );


            showNotification(
                "Failed to add expense!",
                "error"
            );

        }

    }
);


// ============================
// LOAD EXPENSES
// ============================

async function loadExpenses() {

    try {

        const response =
            await fetch(
                `http://localhost:8080/api/transactions/user/${user.id}`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load transactions"
            );

        }


        const transactions =
            await response.json();


        expenseTableBody.innerHTML =
            "";


        const expenses =
            transactions.filter(
                transaction =>
                    transaction.type === "EXPENSE"
            );


        expenses.forEach(
            transaction => {

                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>
                        ${transaction.description}
                    </td>

                    <td>
                        ${transaction.category}
                    </td>

                    <td>
                        ₹${Number(
                            transaction.amount
                        ).toLocaleString("en-IN")}
                    </td>

                    <td>
                        ${transaction.date}
                    </td>

                `;


                expenseTableBody.appendChild(
                    row
                );

            }
        );


    } catch (error) {

        console.error(
            "Load expenses error:",
            error
        );

    }

}


// ============================
// LOGOUT
// ============================

const logoutLink =
    document.getElementById(
        "logoutLink"
    );


if (logoutLink) {

    logoutLink.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            localStorage.removeItem(
                "user"
            );


            localStorage.setItem(
                "logoutMessage",
                "You have been logged out successfully!"
            );


            window.location.href =
                "login.html";

        }
    );

}


// ============================
// LOAD WHEN PAGE OPENS
// ============================

loadExpenses();