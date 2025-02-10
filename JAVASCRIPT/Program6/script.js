function checkEligibility() {
    const age = parseInt(document.getElementById('age').value);
    const experience = parseInt(document.getElementById('experience').value);
    const qualification = document.getElementById('qualification').value;
  
    const resultDiv = document.getElementById('result');
    resultDiv.style.color = "black";
  
    if (isNaN(age) || isNaN(experience) || !qualification) {
      resultDiv.innerText = "Please fill out all fields correctly.";
      resultDiv.style.color = "red";
      return;
    }
  
    if (age < 21 || age > 55) {
      resultDiv.innerText = "Not Eligible: Age must be between 21 and 55.";
    } else if (experience < 2) {
      resultDiv.innerText = "Not Eligible: Experience must be at least 2 years.";
    } else if (qualification.toLowerCase() !== "bachelor's degree") {
      resultDiv.innerText = "Not Eligible: Minimum qualification is a Bachelor's Degree.";
    } else {
      resultDiv.innerText = "Congratulations! You are eligible for the job.";
      resultDiv.style.color = "green";
    }
  }
  