
    document.addEventListener("DOMContentLoaded", function () {

        const payWithUPI = document.getElementById("payid");
        const scanTheQR = document.getElementById("scanid");
        const payWithnum = document.getElementById("paytm")
        const upiContent = document.getElementById("upiContent");
        const scanContent = document.getElementById("scanContent");
        const numContent = document.getElementById("numContent");
        const payNowBtn = document.getElementById("payNowBtn");
        const payNow = document.getElementById("payNow");
        const bank = document.getElementById("bank");
        const credit = document.getElementById("credit");
        const timerContainer = document.getElementById("timer");
        const timerCounter = document.getElementById("timer-counter");
        const creditCardPayNowBtn = document.getElementById("credit");
        const debitCardPayNowBtn = document.getElementById("debit");
        const paymentSuccessPopup = document.getElementById("payment-success-popup");


        payWithUPI.addEventListener("change", () => {
    if (payWithUPI.checked) {
        upiContent.style.display = "block";
        scanContent.style.display = "none";
        numContent.style.display = "none";
    }
});

payWithnum.addEventListener("change", () => {
    if (payWithnum.checked) {
        upiContent.style.display = "none";
        scanContent.style.display = "none";
        numContent.style.display = "block";
    }
});


scanTheQR.addEventListener("change", () => {
    if (scanTheQR.checked) {
        upiContent.style.display = "none";
        scanContent.style.display = "block";
        numContent.style.display = "none";
    }
});

var paymentMethodSelect = document.getElementById("payment-method");


// Get a reference to the selected-payment-method span element in the popup
var selectedPaymentMethodSpan = document.getElementById("selected-payment-method");
paymentMethodSelect.addEventListener("change", function () {
    // Update the selected-payment-method span with the selected payment method
    selectedPaymentMethodSpan.textContent = paymentMethodSelect.options[paymentMethodSelect.selectedIndex].text;
    selectedPaymentMethodSpan.style.display = "none";
});




        // Retrieve cart data from localStorage
  const cartDataString = localStorage.getItem("cartData");
    if (cartDataString) {
        const cartData = JSON.parse(cartDataString);

        // Display order details
        const paymentOrderId = document.getElementById("payment-order-id");
        paymentOrderId.textContent = cartData.orderId;

        const paymentGuestCount = document.getElementById("payment-guest-count");
        paymentGuestCount.textContent = cartData.guestCount;

        // Display cart items
        const paymentCartItemsList = document.getElementById("payment-cart-items");
        cartData.cartItems.forEach(function (itemData) {
            const cartItemElement = document.createElement("li");
            cartItemElement.innerHTML = `
                <ul>
                    ${itemData.subItems.map(subItemData => `<li>${subItemData.name} - ₹${subItemData.price}</li>`).join('')}
                </ul>
            `;
            paymentCartItemsList.appendChild(cartItemElement);
        });

        // Display overall price
        const paymentOverallPrice = document.getElementById("payment-overall-price");
        paymentOverallPrice.textContent = `${cartData.overallPrice}`;
        
        const paymentOverallPrice2 = document.getElementById("payment-overall-price-2");
        paymentOverallPrice2.textContent = `${cartData.overallPrice}`;

        // Populate hidden input fields with data
        document.querySelector('input[name="orderid"]').value = cartData.orderId;
        document.querySelector('input[name="guest"]').value = cartData.guestCount;
        document.querySelector('input[name="items"]').value = JSON.stringify(cartData.cartItems);
        document.querySelector('input[name="totalprice"]').value = cartData.overallPrice;
    }

        // Get references to the select element and the payment method details div
        var paymentMethodSelect = document.getElementById("payment-method");
        var paymentMethodDetails = document.getElementById("payment-method-details");

        paymentMethodSelect.addEventListener("change", function () {
            var selectedMethod = paymentMethodSelect.value;
            console.log("Selected method:", selectedMethod); // Debugging line

            // Hide all payment method details
            var allDetailsDivs = document.querySelectorAll(".payment-method-detail");
            allDetailsDivs.forEach(function (div) {
                div.style.display = "none";
            });

            // Show the selected payment method details
            var selectedDetailDiv = document.getElementById(selectedMethod);
            if (selectedDetailDiv) {
                selectedDetailDiv.style.display = "block";
            }
        });
        let timerInterval;

payNowBtn.addEventListener("click", () => {
    // Hide the "Pay Now" button
    payNowBtn.style.display = "none";

    document.querySelector('input[name="paymethod"]').value = paymentMethodSelect.options[paymentMethodSelect.selectedIndex].text;

    // Show the timer container
    timerContainer.style.display = "block";

    // Initialize the timer to 30 seconds
    let remainingTime = 10;
    timerCounter.textContent = remainingTime;

    // Start the countdown
    timerInterval = setInterval(() => {
        remainingTime--;

        if (remainingTime <= 0) {
            // Stop the timer when it reaches 0
            clearInterval(timerInterval);

            // Show the payment success popup
            paymentSuccessPopup.style.display = "block";

            // Hide the timer container
            timerContainer.style.display = "none";
        } else {
            // Update the timer display
            timerCounter.textContent = remainingTime;
        }
    }, 1000);
});
  // Event listener for "Pay Now" button in the "Pay With Paytm Number" section
  payNow.addEventListener("click", () => {
        // Hide the "Pay Now" button
        payNow.style.display = "none";

        document.querySelector('input[name="paymethod"]').value = paymentMethodSelect.options[paymentMethodSelect.selectedIndex].text;

        // Show the timer container
        timerContainer.style.display = "block";

        // Initialize the timer to 30 seconds (adjust as needed)
        let remainingTime = 30;
        timerCounter.textContent = remainingTime;

        // Start the countdown
        let timerInterval = setInterval(() => {
            remainingTime--;

            if (remainingTime <= 0) {
                // Stop the timer when it reaches 0
                clearInterval(timerInterval);

                // Show the payment success popup
                paymentSuccessPopup.style.display = "block";

                // Hide the timer container
                timerContainer.style.display = "none";
            } else {
                // Update the timer display
                timerCounter.textContent = remainingTime;
            }
        }, 1000);
    });
      bank.addEventListener("click", () => {
        // Hide the "Pay Now" button
        

        document.querySelector('input[name="paymethod"]').value = paymentMethodSelect.options[paymentMethodSelect.selectedIndex].text;

        // Show the timer container
        timerContainer.style.display = "block";

        // Initialize the timer to 30 seconds (adjust as needed)
        let remainingTime = 10;
        timerCounter.textContent = remainingTime;

        // Start the countdown
        let timerInterval = setInterval(() => {
            remainingTime--;

            if (remainingTime <= 0) {
                // Stop the timer when it reaches 0
                clearInterval(timerInterval);

                // Show the payment success popup
                paymentSuccessPopup.style.display = "block";

                // Hide the timer container
                timerContainer.style.display = "none";
            } else {
                // Update the timer display
                timerCounter.textContent = remainingTime;
            }
        }, 1000);
    });
    creditCardPayNowBtn.addEventListener("click", () => {
        // Hide the "Pay Now" button
        creditCardPayNowBtn.style.display = "none";

    document.querySelector('input[name="paymethod"]').value = paymentMethodSelect.options[paymentMethodSelect.selectedIndex].text;

        // Show the timer container
        timerContainer.style.display = "block";

        // Initialize the timer to 30 seconds (adjust as needed)
        let remainingTime = 30;
        timerCounter.textContent = remainingTime;

        // Start the countdown
        let timerInterval = setInterval(() => {
            remainingTime--;

            if (remainingTime <= 0) {
                // Stop the timer when it reaches 0
                clearInterval(timerInterval);

                // Show the payment success popup
                paymentSuccessPopup.style.display = "block";

                // Hide the timer container
                timerContainer.style.display = "none";
            } else {
                // Update the timer display
                timerCounter.textContent = remainingTime;
            }
        }, 1000);

        // You can add additional code here to handle the credit card payment details
        // For example, you can collect the credit card number, card holder's name, etc.
        const cardNumber = document.getElementById("card-number").value;
        const cardHolder = document.getElementById("card-holder").value;
        const expiryDate = document.getElementById("expiry-date").value;
        const cvv = document.getElementById("cvv").value;

        // You can use these values to make the actual payment request to a payment gateway
        // Replace this with your payment processing logic
    });

    debitCardPayNowBtn.addEventListener("click", () => {
        // Hide the "Pay Now" button
        debitCardPayNowBtn.style.display = "none";

       document.querySelector('input[name="paymethod"]').value = paymentMethodSelect.options[paymentMethodSelect.selectedIndex].text;

        // Show the timer container
        timerContainer.style.display = "block";

        // Initialize the timer to 30 seconds (adjust as needed)
        let remainingTime = 30;
        timerCounter.textContent = remainingTime;

        // Start the countdown
        let timerInterval = setInterval(() => {
            remainingTime--;

            if (remainingTime <= 0) {
                // Stop the timer when it reaches 0
                clearInterval(timerInterval);

                // Show the payment success popup
                paymentSuccessPopup.style.display = "block";

                // Hide the timer container
                timerContainer.style.display = "none";
            } else {
                // Update the timer display
                timerCounter.textContent = remainingTime;
            }
        }, 1000);

        // You can add additional code here to handle the credit card payment details
        // For example, you can collect the credit card number, card holder's name, etc.
        const cardNumber = document.getElementById("card-number").value;
        const cardHolder = document.getElementById("card-holder").value;
        const expiryDate = document.getElementById("expiry-date").value;
        const cvv = document.getElementById("cvv").value;

        // You can use these values to make the actual payment request to a payment gateway
        // Replace this with your payment processing logic
    });
});


    

