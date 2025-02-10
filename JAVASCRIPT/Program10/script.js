function calculateFlightFare() {
    const classType = document.getElementById('classType').value;
    const luggageWeight = parseFloat(document.getElementById('luggageWeight').value);
    const isStudent = document.getElementById('isStudent').value === "yes";
    const isSenior = document.getElementById('isSenior').value === "yes";
  
    let baseFare = 300;
    let finalFare = baseFare;
  
    // Class-based charges
    if (classType === "business") {
      finalFare += 200;
    } else if (classType === "first") {
      finalFare += 500;
    }
  
    // Luggage charges
    if (luggageWeight > 20) {
      const extraWeight = Math.ceil((luggageWeight - 20) / 10);
      finalFare += extraWeight * 50;
    }
  
    // Discounts
    if (isStudent) {
      finalFare *= 0.85; // 15% off for students
    } else if (isSenior) {
      finalFare *= 0.90; // 10% off for seniors
    }
  
    document.getElementById('result').innerText = `Total Flight Fare: $${finalFare.toFixed(2)}`;
  }
  