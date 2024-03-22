document.addEventListener("DOMContentLoaded", function () {
    const expandButtons = document.querySelectorAll(".expand-button");
    const cartItems = document.querySelectorAll(".cart-item");
    const cartItemsList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const guestCountInput = document.getElementById("guest-count");
    const overallPrice = document.getElementById("overall-price");
    const proceedToPayLink = document.getElementById("proceed-to-pay-link");
    const orderIdInput = document.getElementById("orderid");

    // Initialize total price variable
    let totalPrice = 0;

    expandButtons.forEach(function (expandButton, index) {
        expandButton.addEventListener("click", function () {
            const cartItem = cartItems[index];
            const subItems = cartItem.querySelector(".sub-items");
            const displayStyle = getComputedStyle(subItems).display;

            if (displayStyle === "none" || displayStyle === "") {
                // Close all other sub-items
                cartItems.forEach(function (item, i) {
                    if (i !== index) {
                        item.querySelector(".sub-items").style.display = "none";
                    }
                });

                subItems.style.display = "block";
            } else {
                subItems.style.display = "none";
            }
        });
    });

    function updateCartDisplay() {
        cartItemsList.innerHTML = "";
        cartTotal.textContent = `₹${totalPrice.toFixed(2)}`; // Update total price with ₹
    }

    function calculateTotalPrice() {
        // Calculate total price from the list of items in the cart
        let calculatedTotalPrice = 0;
        cartItemsList.querySelectorAll("li").forEach(function (item) {
            const itemPrice = parseFloat(item.dataset.price);
            calculatedTotalPrice += itemPrice;
        });
        return calculatedTotalPrice; // Return the total price as a number
    }

    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach(function (addToCartButton, index) {
        addToCartButton.addEventListener("click", function () {
            const cartItem = cartItems[index];
            const itemName = cartItem.querySelector("h2").textContent;
            const subItemCheckboxes = cartItem.querySelectorAll(".sub-item input[type='checkbox']");
            const selectedSubItems = [];

            subItemCheckboxes.forEach(function (checkbox) {
                if (checkbox.checked) {
                    const subItemName = checkbox.parentElement.textContent.trim();
                    const subItemPrice = parseFloat(checkbox.dataset.price);
                    selectedSubItems.push({ name: subItemName, price: subItemPrice });
                }
            });

            // Calculate total price for selected items
            const totalPriceForItem = selectedSubItems.reduce((total, item) => total + item.price, 0).toFixed(2);

            // Add the item to the cart
            if (selectedSubItems.length > 0) {
                const cartItemElement = document.createElement("li");
                cartItemElement.dataset.price = totalPriceForItem;
                cartItemElement.innerHTML = `
                    <span>${itemName} - ₹${totalPriceForItem}</span> <!-- Update here to ₹ -->
                    <ul>
                        ${selectedSubItems.map(item => `<li>${item.name} - ₹${item.price.toFixed(2)}</li>`).join('')} <!-- Update here to ₹ -->
                    </ul>
                    <button class="remove-from-cart">Remove</button>
                `;
                cartItemsList.appendChild(cartItemElement);

                // Update the total price
                totalPrice += parseFloat(totalPriceForItem);
                cartTotal.textContent = `₹${totalPrice.toFixed(2)}`; // Update total price with ₹

                // Add click event listener to the new "Remove" button
                const removeButton = cartItemElement.querySelector(".remove-from-cart");
                removeButton.addEventListener("click", function () {
                    removeFromCart(cartItemElement, parseFloat(totalPriceForItem));
                });

                alert("Item Added To Cart");
            }
        });
    });

    // Function to remove an item from the cart
    function removeFromCart(cartItemElement, itemPrice) {
        cartItemsList.removeChild(cartItemElement);

        // Update the total price by subtracting the removed item's price
        totalPrice -= itemPrice;
        cartTotal.textContent = `₹${totalPrice.toFixed(2)}`; // Update total price with ₹
    }

    function updateOverallPrice() {
        const guestCount = parseInt(guestCountInput.value);
        const deliveryCharges = 200;
        const totalWithoutDelivery = totalPrice * guestCount;
        const overallPriceValue = totalWithoutDelivery + deliveryCharges;
        overallPrice.textContent = `₹${overallPriceValue.toFixed(2)}`;
    }

    guestCountInput.addEventListener("input", updateOverallPrice);

    function saveCartDataToLocalStorage() {
        const cartData = {
            orderId: orderIdInput.value,
            guestCount: guestCountInput.value,
            overallPrice: overallPrice.textContent,
            cartItems: [],
        };

        // Loop through the cart items and save them
        cartItems.forEach(function (cartItem, index) {
            const itemData = {
                name: cartItem.querySelector("h2").textContent,
                price: cartItem.querySelector(".add-to-cart").getAttribute("data-price"),
                subItems: [],
            };

            // Loop through the sub-items of each cart item and save them
            cartItem.querySelectorAll(".sub-item").forEach(function (subItem) {
                const checkbox = subItem.querySelector("input[type='checkbox']");
                if (checkbox.checked) {
                    const subItemData = {
                        name: subItem.querySelector("label").textContent,
                        price: checkbox.getAttribute("data-price"),
                    };
                    itemData.subItems.push(subItemData);
                }
            });

            if (itemData.subItems.length > 0) {
                cartData.cartItems.push(itemData);
            }
        });


        // Store the cart data in localStorage
        localStorage.setItem("cartData", JSON.stringify(cartData));
    }

    // Add an event listener to the "Proceed To Pay" link
    proceedToPayLink.addEventListener("click", function () {
        // Save the cart data to localStorage before proceeding to payment.html
        saveCartDataToLocalStorage();
    });

    
});

function proceedToPay() {
        const orderIdInput = document.getElementById("orderid");
        const orderId = orderIdInput.value;

        if (orderId.match(/^OID[0-9]{5}$/)) {
            // Valid Order ID, proceed to the next page
            window.location.href = "pay.html";
        } else {
            const validationMessage = document.getElementById("validation-message");
            validationMessage.textContent = "Order ID should be in the format OID12345";
        }
    }




