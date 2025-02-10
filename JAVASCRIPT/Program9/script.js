function calculateElectricityBill() {
    const units = parseInt(document.getElementById('units').value);
    const timeOfDay = parseInt(document.getElementById('timeOfDay').value);
    let rate = 0;
    let bill = 0;
  
    const resultDiv = document.getElementById('result');
  
    if (isNaN(units) || isNaN(timeOfDay) || units <= 0 || timeOfDay < 0 || timeOfDay > 23) {
      resultDiv.innerText = "Please enter valid inputs for units and time.";
      resultDiv.style.color = "red";
      return;
    }
  
    if (units <= 100) {
      rate = 5;
    } else if (units <= 300) {
      rate = 4;
    } else {
      rate = 3;
    }
  
    bill = units * rate;
  
    if (timeOfDay >= 20 || timeOfDay < 8) {
      bill *= 1.1;
    }
  
    resultDiv.innerText = `Total Electricity Bill: $${bill.toFixed(2)}`;
    resultDiv.style.color = "green";
  }
  