function showNotification(message, type = "success") {

    let container =
        document.querySelector(".toast-container");

    if (!container) {

        container =
            document.createElement("div");

        container.className =
            "toast-container";

        document.body.appendChild(container);

    }


    const toast =
        document.createElement("div");

    toast.className =
        `toast ${type}`;


    let icon = "✅";

    if (type === "error") {
        icon = "❌";
    }

    if (type === "info") {
        icon = "ℹ️";
    }


    toast.innerHTML = `

        <span class="toast-icon">
            ${icon}
        </span>

        <span class="toast-message">
            ${message}
        </span>

        <button class="toast-close">
            ✕
        </button>

    `;


    container.appendChild(toast);


    const closeButton =
        toast.querySelector(".toast-close");


    closeButton.addEventListener(
        "click",
        function () {

            removeToast(toast);

        }
    );


    setTimeout(function () {

        removeToast(toast);

    }, 3000);

}


function removeToast(toast) {

    if (!toast) {
        return;
    }

    toast.classList.add("hide");

    setTimeout(function () {

        toast.remove();

    }, 300);

}