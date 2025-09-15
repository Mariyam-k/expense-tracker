const balanceEl = document.getElementById("balance");
const form = document.getElementById("expense-form");
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const expenseTableBody = document.getElementById("expense-table-body");
const totalExpensesEl = document.getElementById("total-expenses");

let balance = 0;
let expenses = [];

// window.addEventListener("load", () => {
//     const storedBalance = localStorage.getItem("balance");
//     const storedExpenses = localStorage.getItem("expenses");

//     if (storedBalance) balance = Number(storedBalance);
//     if (storedExpenses) expenses = JSON.parse(storedExpenses);

//     updateUI();
// });

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const desc = descInput.value.trim();
    const amount = Number(amountInput.value);
     const category = categoryInput.value;

    if (desc && amount > 0 && category) {
        const expense = {
            id: Date.now(),
            desc,
            amount,
            category
        };
        expenses.push(expense);
        balance -= amount;

        updateUI();
        // reset form
        descInput.value = "";
        amountInput.value = "";
        categoryInput.value = "";

    }
});

//update UI
function updateUI() {
    balanceEl.textContent = ` $${balance}`;
    expenseTableBody.innerHTML = "";

    let totalExpenses = 0;

    expenses.forEach(exp => {
        totalExpenses += exp.amount;

        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${exp.desc}</td>
        <td>${exp.category}</td>
        <td>${exp.amount}</td>
        <td> <button class = "delete-btn" onclick = "deleteExpense(${exp.id})">❌</button></td>      
        `;
        expenseTableBody.appendChild(row);
    });
    totalExpensesEl.textContent = `$${totalExpenses}`;
}

//delete expense
function deleteExpense(id) {
    const expense = expenses.find(exp => exp.id == id);
    if (expense) {
        balance += expense.amount;
        expenses = expenses.filter(exp => exp.id !== id);
        updateUI();
    }
}

// //save data
// function saveData() {
//     localStorage.setItem("balance", balance);
//     localStorage.setItem("expenses", JSON.stringify(expenses));
// }