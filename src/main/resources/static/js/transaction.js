const transactionTableBody =
    document.getElementById("transactionTableBody");

const searchInput =
    document.getElementById("searchInput");

const typeFilter =
    document.getElementById("typeFilter");

const editBox =
    document.getElementById("editBox");

const editForm =
    document.getElementById("editForm");

const cancelEdit =
    document.getElementById("cancelEdit");

const storedUser =
    localStorage.getItem("user");

if (!storedUser) {

    window.location.href = "login.html";

}

const user = JSON.parse(storedUser);

let transactions = [];

let editingTransactionId = null;


// Load transactions

async function loadTransactions() {

    try {

        const response = await fetch(
            `http://localhost:8080/api/transactions/user/${user.id}`
        );

        if (!response.ok) {
            throw new Error("Failed to load transactions");
        }

        transactions = await response.json();

        displayTransactions();

    } catch (error) {

        console.error(
            "Error loading transactions:",
            error
        );

    }

}


// Display transactions

function displayTransactions() {

    const searchText =
        searchInput.value.toLowerCase();

    const selectedType =
        typeFilter.value;

    transactionTableBody.innerHTML = "";

    const filteredTransactions =
        transactions.filter(transaction => {

            const description =
                transaction.description
                    ? transaction.description.toLowerCase()
                    : "";

            const category =
                transaction.category
                    ? transaction.category.toLowerCase()
                    : "";

            const matchesSearch =
                description.includes(searchText) ||
                category.includes(searchText);

            const matchesType =
                selectedType === "ALL" ||
                transaction.type === selectedType;

            return matchesSearch && matchesType;

        });


    filteredTransactions.forEach(transaction => {

        const row =
            document.createElement("tr");

        const typeText =
            transaction.type === "INCOME"
                ? "Income"
                : "Expense";


        row.innerHTML = `

            <td>${typeText}</td>

            <td>${transaction.description}</td>

            <td>${transaction.category}</td>

            <td>
                ₹${Number(transaction.amount)
                    .toLocaleString("en-IN")}
            </td>

            <td>${transaction.date}</td>

            <td>

                <button
                    onclick="editTransaction(${transaction.id})">
                    Edit
                </button>

                <button
                    onclick="deleteTransaction(${transaction.id})">
                    Delete
                </button>

            </td>

        `;

        transactionTableBody.appendChild(row);

    });

}


// Search

searchInput.addEventListener(
    "input",
    displayTransactions
);


// Filter

typeFilter.addEventListener(
    "change",
    displayTransactions
);


// Open edit form

function editTransaction(id) {

    const transaction =
        transactions.find(
            item => item.id === id
        );

    if (!transaction) {
        return;
    }

    editingTransactionId = id;

    document.getElementById("editDescription").value =
        transaction.description;

    document.getElementById("editCategory").value =
        transaction.category;

    document.getElementById("editAmount").value =
        transaction.amount;

    document.getElementById("editDate").value =
        transaction.date;

    editBox.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// Save edited transaction

editForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        if (!editingTransactionId) {
            return;
        }

        const transaction =
            transactions.find(
                item => item.id === editingTransactionId
            );

        if (!transaction) {
            return;
        }

        const updatedTransaction = {

            amount:
                Number(
                    document.getElementById("editAmount").value
                ),

            type:
                transaction.type,

            category:
                document.getElementById("editCategory").value,

            description:
                document.getElementById("editDescription").value,

            date:
                document.getElementById("editDate").value,

            user: {
                id: user.id
            }

        };


        try {

            const response = await fetch(
                `http://localhost:8080/api/transactions/${editingTransactionId}`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body:
                        JSON.stringify(
                            updatedTransaction
                        )

                }
            );


            if (!response.ok) {
                throw new Error(
                    "Update failed"
                );
            }


           showNotification("Transaction updated successfully!", "success");

            editBox.style.display = "none";

            editingTransactionId = null;

            editForm.reset();

            loadTransactions();


        } catch (error) {

            console.error(
                "Update error:",
                error
            );

            showNotification("Failed to update transaction!", "error");

        }

    }
);


// Cancel editing

cancelEdit.addEventListener(
    "click",
    function () {

        editBox.style.display = "none";

        editingTransactionId = null;

        editForm.reset();

    }
);


// Delete transaction

async function deleteTransaction(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this transaction?"
        );

    if (!confirmDelete) {
        return;
    }


    try {

        const response = await fetch(
            `http://localhost:8080/api/transactions/${id}`,
            {
                method: "DELETE"
            }
        );


        if (!response.ok) {
            throw new Error(
                "Delete failed"
            );
        }


        showNotification("Transaction deleted successfully!", "success");

        loadTransactions();


    } catch (error) {

        console.error(
            "Delete error:",
            error
        );

       showNotification(
    "Unable to delete transaction.",
    "error"
);

    }

}

// Logout

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
// Load when page opens

loadTransactions();