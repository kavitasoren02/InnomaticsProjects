function calculateGrade(marks, attandance) {
  if (attandance > 90) {
    marks += marks;
  }
  if (marks > 100) {
    return 100;
  }

  if (marks >= 90) {
    return "Grade A";
  } else if (marks >= 80 && marks < 90) {
    return "Grade B";
  } else if (marks >= 70 && marks < 80) {
    return "Grade C";
  } else if (marks >= 60 && marks < 70) {
    return "Grade D";
  } else {
    return "Fail";
  }
}

function processGrade() {
  const marks = parseFloat(document.getElementById("marks").value);
  const attendance = parseFloat(document.getElementById("attendance").value);

  if (
    isNaN(marks) ||
    marks < 0 ||
    marks > 100 ||
    isNaN(attendance) ||
    attendance < 0 ||
    attendance > 100
  ) {
    document.getElementById("result").innerText =
      "Please enter valid marks and attendance";
    return;
  }
  const grade = calculateGrade(marks, attendance);
  document.getElementById("result").innerText = `Final Grade: ${grade}`;
}
