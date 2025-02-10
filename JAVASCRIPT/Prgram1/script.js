function atmWithdrawal(balance, amount, pin, enteredPin) {
    if (enteredPin !== pin) {
      return "Incorrect PIN";
    }

    if (amount > balance) {
      return "Insufficient Funds";
    }

    if (amount % 100 !== 0) {
      return "Enter amount in multiples of 100";
    }

    balance -= amount;
    return `Transaction Successful! Remaining Balance: ₹${balance}`;
  }

  function processWithdrawal() {
    const balance = parseFloat(document.getElementById("balance").value);
    const amount = parseFloat(document.getElementById("amount").value);
    const pin = document.getElementById("pin").value;
    const enteredPin = document.getElementById("enteredPin").value;

    const result = atmWithdrawal(balance, amount, pin, enteredPin);
    document.getElementById("result").innerText = result;
  }