document.addEventListener("DOMContentLoaded", () => {
    console.log("singup script");
    let errorDiv = document.getElementById("sign-up-error");
    document.getElementsByTagName("form")[0].addEventListener("submit", (e) => {
        const form = e.target;
        const data = new FormData(form);
        for (const [name, value] of data) {
            if (value == "") {
                e.preventDefault();
                errorDiv.innerHTML = "All fields are required."
                return;
            }
        }
    });

});