document.addEventListener("DOMContentLoaded", function () {
    const expenseForm = document.getElementById("expenseForm");
    const expenseList = document.getElementById("expenseList");
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  
    function renderExpenses() {
      expenseList.innerHTML = "";
      expenses.forEach((expense, index) => {
        const expenseItem = document.createElement("div");
        expenseItem.className = "expense-item";
        expenseItem.innerHTML = `
          <span>${expense.description}</span>
          <span>$${expense.amount}</span>
          <span>${expense.category}</span>
          <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
          <button class="btn btn-sm btn-primary edit-btn" data-index="${index}">Edit</button>
        `;
        expenseList.appendChild(expenseItem);
      });
    }
  
    renderExpenses();
  
    expenseForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const amount = parseFloat(document.getElementById("amount").value);
      const description = document.getElementById("description").value;
      const category = document.getElementById("category").value;
  
      expenses.push({ amount, description, category });
      localStorage.setItem("expenses", JSON.stringify(expenses));
      renderExpenses();
      expenseForm.reset();
    });
  
    expenseList.addEventListener("click", function (e) {
      if (e.target.classList.contains("delete-btn")) {
        const index = parseInt(e.target.getAttribute("data-index"));
        expenses.splice(index, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        renderExpenses();
      } else if (e.target.classList.contains("edit-btn")) {
        const index = parseInt(e.target.getAttribute("data-index"));
        const editedAmount = parseFloat(prompt("Edit amount:", expenses[index].amount));
        const editedDescription = prompt("Edit description:", expenses[index].description);
        const editedCategory = prompt("Edit category:", expenses[index].category);
  
        if (!isNaN(editedAmount) && editedDescription && editedCategory) {
          expenses[index] = {
            amount: editedAmount,
            description: editedDescription,
            category: editedCategory,
          };
          localStorage.setItem("expenses", JSON.stringify(expenses));
          renderExpenses();
        }
      }
    });
  });
  