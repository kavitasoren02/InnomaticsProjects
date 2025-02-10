function applyCoupon() {
    const orderAmount = parseFloat(document.getElementById('orderAmount').value);
    const couponCode = document.getElementById('couponCode').value;
    let finalPrice = orderAmount;
  
    const resultDiv = document.getElementById('result');
  
    if (isNaN(orderAmount) || orderAmount <= 0) {
      resultDiv.innerText = "Please enter a valid order amount.";
      resultDiv.style.color = "red";
      return;
    }
  
    if (couponCode === "DISCOUNT10") {
      if (orderAmount > 500) {
        finalPrice *= 0.9; // 10% discount
        resultDiv.innerText = `Coupon Applied! Final Price: $${finalPrice.toFixed(2)}`;
      } else {
        resultDiv.innerText = "DISCOUNT10 is valid only for orders above $500.";
        resultDiv.style.color = "red";
      }
    } else if (couponCode === "FREESHIP") {
      if (orderAmount > 200) {
        resultDiv.innerText = `Coupon Applied! Free Shipping Granted. Final Price: $${finalPrice.toFixed(2)}`;
      } else {
        resultDiv.innerText = "FREESHIP is valid only for orders above $200.";
        resultDiv.style.color = "red";
      }
    } else {
      resultDiv.innerText = "Invalid coupon code.";
      resultDiv.style.color = "red";
    }
  }
  