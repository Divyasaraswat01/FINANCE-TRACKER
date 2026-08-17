const incomeForm =
    document.getElementById("incomeForm");

const incomeTableBody =
    document.getElementById("incomeTableBody");


const storedUser =
    localStorage.getItem("user");


if (!storedUser) {

    window.location.href =
        "login.html";

}


const user =
    JSON.parse(storedUser);


// Add Income

incomeForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const source =
            document
                .getElementById("source")
                .value
                .trim();


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

                            type: "INCOME",

                            category: source,

                            description: source,

                            date: date,

                            user: {
                                id: user.id
                            }

                        })

                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to add income"
                );

            }


            showNotification(
                "Income added successfully!",
                "success"
            );


            incomeForm.reset();


            loadIncome();


        } catch (error) {

            console.error(error);


            showNotification(
                "Unable to add income.",
                "error"
            );

        }

    }
);


// Load Income

async function loadIncome() {

    try {

        const response =
            await fetch(
                `http://localhost:8080/api/transactions/user/${user.id}`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load income"
            );

        }


        const transactions =
            await response.json();


        incomeTableBody.innerHTML =
            "";


        const incomes =
            transactions.filter(
                transaction =>
                    transaction.type === "INCOME"
            );


        incomes.forEach(
            transaction => {

                const row =
                    document.createElement("tr");


                row.innerHTML = `

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


                incomeTableBody
                    .appendChild(row);

            }
        );


    } catch (error) {

        console.error(
            "Income loading error:",
            error
        );


        showNotification(
            "Unable to load income.",
            "error"
        );

    }

}


// Logout

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


// Load income when page opens

loadIncome();