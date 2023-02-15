// Get the DOM elements
const costInput = document.getElementById("cost");
const costRange = document.getElementById("cost-range");
const contributionInput = document.getElementById("contribution");
const contributionRange = document.getElementById("contribution-range");
const termInput = document.getElementById("term");
const termRange = document.getElementById("term-range");
const loader = document.querySelector(".loader");
const calculatorBtnText = document.querySelector(".calculator-btn__text");
const leasingTotal = document.querySelector(
  ".calculator-total:nth-of-type(1) .calculator-number"
);
const monthlyPayment = document.querySelector(
  ".calculator-total:nth-of-type(2) .calculator-number"
);
const applicationBtn = document.querySelector(".calculator-btn");

// Set initial values for the inputs
costInput.value = 3300000;
contributionInput.value = formatNumber(Math.round(costInput.value * 0.13));
termInput.value = 60;

// Initialize the calculator
updateCalculator();

// Add event listeners to the inputs and ranges
costInput.addEventListener("input", handleCostInput);
costRange.addEventListener("input", handleCostRange);
contributionInput.addEventListener("input", handleContributionInput);
contributionRange.addEventListener("input", handleContributionRange);
termInput.addEventListener("input", handleTermInput);
termRange.addEventListener("input", handleTermRange);
applicationBtn.addEventListener("click", onApplyBtnClick);
//

// Function to handle changes to the cost input
function handleCostInput(event) {
  const cost = event.target.value;
  costInput.value = formatNumber(cost);
  costRange.value = cost;
  updateCalculator();
}

// Function to handle changes to the cost range
function handleCostRange(event) {
  const cost = event.target.value;
  costInput.value = formatNumber(cost);
  updateCalculator();
}

// Function to handle changes to the contribution input
function handleContributionInput(event) {
  let contribution = getValidContribution(event.target.value);
  const cost = parseInt(costInput.value.replace(/\s/g, ""));
  contribution = Math.min(contribution, cost * 0.6);
  contributionInput.value = formatNumber(contribution);
  contributionRange.value = Math.round((contribution / cost) * 100);
  updateCalculator();
}

// Function to handle changes to the contribution range
function handleContributionRange(event) {
  const contributionPercentage = event.target.value;
  const cost = parseInt(costInput.value.replace(/\s/g, ""));
  const contribution = Math.round((contributionPercentage / 100) * cost);
  contributionInput.value = formatNumber(contribution);
  updateCalculator();
}

// Function to handle changes to the term input
function handleTermInput(event) {
  const term = getValidTerm(event.target.value);
  termInput.value = term;
  termRange.value = term;
  updateCalculator();
}

// Function to handle changes to the term range
function handleTermRange(event) {
  const term = event.target.value;
  termInput.value = term;
  updateCalculator();
}

// Function to update the calculator
function updateCalculator() {
  const cost = parseInt(costInput.value.replace(/\s/g, ""));
  const contribution = parseInt(contributionInput.value.replace(/\s/g, ""));
  const term = parseInt(termInput.value.replace(/\s/g, ""));

  const monthlyPaymentValue = Math.round(
    ((cost - contribution) * 0.05 * Math.pow(1.05, term)) /
      (1 - Math.pow(1.05, -term))
  );
  const leasingTotalValue = contribution + monthlyPaymentValue * term;

  monthlyPayment.textContent = formatNumber(monthlyPaymentValue) + " ₽";
  leasingTotal.textContent = formatNumber(leasingTotalValue) + " ₽";
}

// Function to format a number with spaces as thousands separators
function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


function onApplyBtnClick() {
  loader.style.display = "inline-block";
  calculatorBtnText.style.display = "none";

  const data = {
    cost: costInput.value,
    contribution: contributionInput.value,
    term: termInput.value,
    amount: leasingTotal.innerText,
    payment: monthlyPayment.innerText,
  };
  setTimeout(() => {
    loader.style.display = "none";
    calculatorBtnText.style.display = "block";
    alert(JSON.stringify(data));
  }, 300);
}
