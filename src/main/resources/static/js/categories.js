const storedUser =
    localStorage.getItem("user");


if (!storedUser) {

    window.location.href =
        "login.html";

}


const user =
    JSON.parse(storedUser);


const categoryContainer =
    document.getElementById(
        "categoryContainer"
    );


// Load Categories

async function loadCategories() {

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


        const categories = {};


        transactions.forEach(
            transaction => {

                const category =
                    transaction.category ||
                    "Other";


                if (!categories[category]) {

                    categories[category] = {
                        income: 0,
                        expense: 0
                    };

                }


                if (
                    transaction.type ===
                    "INCOME"
                ) {

                    categories[category].income +=
                        Number(
                            transaction.amount
                        );

                }


                if (
                    transaction.type ===
                    "EXPENSE"
                ) {

                    categories[category].expense +=
                        Number(
                            transaction.amount
                        );

                }

            }
        );


        displayCategories(
            categories
        );


    } catch (error) {

        console.error(
            "Category error:",
            error
        );


        categoryContainer.innerHTML =
            "<p>Unable to load categories.</p>";

    }

}


// Display Categories

function displayCategories(
    categories
) {

    categoryContainer.innerHTML =
        "";


    const categoryNames =
        Object.keys(categories);


    if (categoryNames.length === 0) {

        categoryContainer.innerHTML =
            "<p>No categories found.</p>";

        return;

    }


    categoryNames.forEach(
        category => {

            const data =
                categories[category];


            const balance =
                data.income -
                data.expense;


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "category-card";


            card.innerHTML = `

                <div class="category-icon">
                    📂
                </div>

                <h2>
                    ${category}
                </h2>

                <p>
                    Income:
                    ₹${data.income.toLocaleString("en-IN")}
                </p>

                <p>
                    Expense:
                    ₹${data.expense.toLocaleString("en-IN")}
                </p>

                <h3>
                    Balance:
                    ₹${balance.toLocaleString("en-IN")}
                </h3>

            `;


            categoryContainer.appendChild(
                card
            );

        }
    );

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


// Load categories

loadCategories();