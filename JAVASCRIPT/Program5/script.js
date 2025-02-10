function calculateTicketPrice() {
    const age = parseInt(document.getElementById('ticketAge').value);
    const showTime = parseInt(document.getElementById('showTime').value);
    const standardPrice = 12;
    let finalPrice = standardPrice;
  
    if (isNaN(age) || isNaN(showTime) || age <= 0 || showTime < 0 || showTime > 23) {
      document.getElementById('ticketResult').innerText = "Please enter valid inputs for age and show time.";
      return;
    }
  
    if (showTime < 17) finalPrice *= 0.8; 
    if (age > 60) finalPrice *= 0.7; 
    else if (age < 12) finalPrice *= 0.6; 
  
    document.getElementById('ticketResult').innerText = `Final Ticket Price: $${finalPrice.toFixed(2)}`;
  }
  