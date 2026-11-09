const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {     // Bug: <= should be <. 
    debugger; //setting up debugger here to observe the total and i iterate inside the loop.
    
  // By changing <= to <, the loop is not trying to read a item that doesn't exist past the length of array.
      total += cartItems[i].price; // Error: TypeError: Cannot read prperty(cart.js:11) Bug: cartItems[i] is undefined on the last iteration
  }
  return total;
}

function applyDiscount(total, discountRate) {
  debugger; //setting up debugger here to observe total and discountRate are accurate.
  const validateTotal = typeof total === 'number' ? total : 0; //Added validation to ensure that the discount is a number between 0 and 1.
  const validateDiscountRate = (typeof discountRate === 'number' && discountRate >= 0 && discountRate <= 1) ? discountRate : 0;
  return validateTotal - (validateTotal * validateDiscountRate); // Bug: Missing validation for discountRate

}

function generateReceipt(cartItems, total) {
  if(cartItems.lenth === 0 || !Array.isArray(cartItems)) {//The if statements are ensuring that the code doesn't crash and will fail gracefully.
    return "Cart is empty";
  }
  let receipt = "Items:\n";
  cartItems.forEach(item => {
      receipt += `${item.name}: $${item.price}\n`;
      debugger; //setting a debugger here to observe the items being iterated through in the loop.
  });
  const isTotalNumber = typeof total === 'number' ? total: 0; //checking to see if it's a number before being called.
  receipt += `Total: $${isTotalNumber.toFixed(2)}`; // Bug: total may not be a number
  return receipt;
}

// Debugging entry point
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total, 0.2); // 20% discount
const receipt = generateReceipt(cart, discountedTotal);

document.getElementById("total").textContent = `Total: $${discountedTotal}`;
document.getElementById("receipt").textContent = receipt;

const emptyCart = []; //validating a test for an empty cart.
const totalOne = calculateTotal(emptyCart);
const discountedTotalOne = applyDiscount(totalOne, 0.2);
const receiptOne =  generateReceipt(emptyCart, discountedTotalOne);
console.log(`Cart is empty. Total: ${receiptOne}`);

const singleItem = [{name: "Laptop", price: 1000 }]; //validating a test for a cart with only 1 item.
const totalTwo = calculateTotal(singleItem);
const discountedTotalTwo = applyDiscount(totalTwo, 0.2);
const receiptTwo =  generateReceipt(singleItem, discountedTotalTwo);
console.log(`Cart only has 1 item. Total: ${receiptTwo}`);

const invalidDiscount = 0; //validating a test for a discount rate of 0.
const totalThree = calculateTotal(invalidDiscount);
const discountedTotalThree = applyDiscount(totalThree, 0);
const receiptThree =  generateReceipt(invalidDiscount, discountedTotalThree);
console.log(`No discount is applied. Total: ${receiptThree}`);

