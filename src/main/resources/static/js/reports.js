const storedUser = localStorage.getItem("user");

if (!storedUser) {

    window.location.href = "login.html";

}

const user = JSON.parse(storedUser);


async function loadReports() {

    try {

        const response = await fetch(
            `http://localhost:8080/api/transactions/user/${user.id}`
        );

        if (!response.ok) {
            throw new Error("Failed to load transactions");
        }

        const transactions = await response.json();


        let totalIncome = 0;
        let totalExpense = 0;


        const incomeCategories = {};
        const expenseCategories = {};


        transactions.forEach(transaction => {

            const amount = Number(transaction.amount);

            const category =
                transaction.category || "Other";


            if (transaction.type === "INCOME") {

                totalIncome += amount;


                if (!incomeCategories[category]) {
                    incomeCategories[category] = 0;
                }

                incomeCategories[category] += amount;

            }


            if (transaction.type === "EXPENSE") {

                totalExpense += amount;


                if (!expenseCategories[category]) {
                    expenseCategories[category] = 0;
                }

                expenseCategories[category] += amount;

            }

        });


        const balance =
            totalIncome - totalExpense;


        document.getElementById("totalIncome")
            .textContent =
            `₹${totalIncome.toLocaleString("en-IN")}`;


        document.getElementById("totalExpense")
            .textContent =
            `₹${totalExpense.toLocaleString("en-IN")}`;


        document.getElementById("totalBalance")
            .textContent =
            `₹${balance.toLocaleString("en-IN")}`;


        displayCategories(
            incomeCategories,
            "incomeCategoryTable"
        );


        displayCategories(
            expenseCategories,
            "expenseCategoryTable"
        );


    } catch (error) {

        console.error(
            "Reports error:",
            error
        );

    }

}


function displayCategories(
    categories,
    tableId
) {

    const table =
        document.getElementById(tableId);

    table.innerHTML = "";


    Object.entries(categories)
        .forEach(([category, amount]) => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${category}</td>

                <td>
                    ₹${amount.toLocaleString("en-IN")}
                </td>

            `;


            table.appendChild(row);

        });

}
const logoutLink =
    document.getElementById("logoutLink");

if (logoutLink) {

    logoutLink.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            localStorage.removeItem("user");

            localStorage.setItem(
                "logoutMessage",
                "You have been logged out successfully!"
            );

            window.location.href =
                "login.html";

        }
    );

}

loadReports();