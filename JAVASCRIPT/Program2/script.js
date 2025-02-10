function calculateFinalAmount(orderAmount) {
    let discount = 0;
    let shippingCharge = 0;

    if (orderAmount > 1000) {
      discount = 0.20 * orderAmount;
    } else if (orderAmount >= 500 && orderAmount <= 1000) {
      discount = 0.10 * orderAmount;
    }

    let finalAmount = orderAmount - discount;

    if (finalAmount < 50) {
      shippingCharge = 10; 
    }

    finalAmount += shippingCharge;

    return `Final Payable Amount: $${finalAmount.toFixed(2)}`;
  }

  function calculateAmount() {
    const orderAmount = parseFloat(document.getElementById("orderAmount").value);
    if (isNaN(orderAmount) || orderAmount <= 0) {
      document.getElementById("result").innerText = "Please enter a valid order amount.";
      return;
    }
    const result = calculateFinalAmount(orderAmount);
    document.getElementById("result").innerText = result;
  }