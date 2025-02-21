let selectedCard = null;

function selectedCustomerType(type) {
  console.log("Type of member", type);

  const divCards = document.querySelectorAll(".card");
  divCards.forEach((card) => card.classList.remove("selected-card"));
  // console.log(divCards);
  selectedCard = document.getElementById(type + "Card");
  selectedCard.classList.add("selected-card");
  console.log(selectedCard);
  document.body.dataset.customerType = type;
}
function calculateTotal() {
  const coffeeType = document.getElementById("coffeeType").value;
  const coffeeSize = document.getElementById("coffeeSize").value;
  const quantity = parseInt(document.getElementById("quantity").value);
  const whippedCream = document.getElementById("whippedCream").checked
    ? 0.5
    : 0;
  const syrup = document.getElementById("syrup").checked ? 0.75 : 0;
  const extraShot = document.getElementById("extraShot").checked ? 1 : 0;
  const promoCode = document.getElementById("promoCode").value;

  const prices = {
    latte: { small: 3, medium: 4, large: 5 },
    espresso: { small: 3.5, medium: 4, large: 5.5 },
    mocha: { small: 3.5, medium: 4, large: 5 },
  };

  const discounts = {
    gold: 0.2,
    silver: 0.1,
    regular: 0,
  };

  const taxRate = 0.07;
  const promoDiscounts = promoCode === "COFFEE10" ? 0.1 : 0;

  const basePrice = prices[coffeeType][coffeeSize] * quantity;
  const addons = (whippedCream + extraShot + syrup) * quantity;
  const subTotal = basePrice + addons;
  const discountCalculation = discounts[document.body.dataset.customerType];
  console.log("Discount calculation", discountCalculation);

  const discount =
    subTotal * discounts[document.body.dataset.customerType] * quantity;
  console.log("total discount", discount);

  const tax = (subTotal - discount) * taxRate;
  const total = (subTotal - discount + tax) * (1 - promoDiscounts);

  document.getElementById(
    "summaryCoffee"
  ).textContent = `Coffee: ${coffeeType} (${coffeeSize})`;
  document.getElementById(
    "summaryQuantity"
  ).textContent = `Quantity: ${quantity}`;
  document.getElementById("summaryAddons").textContent = `Add-ons ${addons}`;
  document.getElementById("subtotal").textContent = `SubTotal: ${subTotal.toFixed(2)}`;
  document.getElementById("discount").textContent = `Discount: ${discount.toFixed(2)}`;
  document.getElementById("tax").textContent = `Tax: ${tax.toFixed(2)}`;
  document.getElementById("total").textContent = `Total: ${total.toFixed(2)}`;

  document.getElementById("result").style.display = "block";
}
function printInvoice() {
  const invoiceContent = document.getElementById("result").innerHTML;
  const printWindow = window.open("", "", "width=600,height=600");

  printWindow.document.write(`
      <html>
        <head>
          <title>Print Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            h2 {
              text-align: center;
              margin-bottom: 20px;
            }
            p {
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          ${invoiceContent}
        </body>
      </html>
    `);

  printWindow.document.close();
  printWindow.focus();

  printWindow.print();
  printWindow.close();
}
