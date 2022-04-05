let id = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);

let username = id("username"),
    email = id("email"),
    product = id("product"),
    quantity = id("quantity"),
    price = id("price"),
    errorMsg = classes("error"),
    successIcon = classes("success-icon"),
    failureIcon = classes("failure-icon");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    engine(username, 0, "Name cannot be blank / Invalid input(No numbers allowed)");
    engine(email, 1, "Email cannot be blank / Invalid Email");
    engine(product, 2, "Product cannot be blank / Enter products listed in the store");
    engine(quantity, 3, "quantity cannot be blank / Invalid input");
    engine(price, 4, "Price cannot be blank / Invalid input");
});


let engine = (id, serial, message) => {
    if (id.value.trim() === "") {
        errorMsg[serial].innerHTML = message;
        id.style.border = "2px solid red";

        // icons
        failureIcon[serial].style.opacity = "1";
        successIcon[serial].style.opacity = "0";
    } else {
        errorMsg[serial].innerHTML = "";
        id.style.border = "2px solid green";

        // icons
        failureIcon[serial].style.opacity = "0";
        successIcon[serial].style.opacity = "1";
    }
};