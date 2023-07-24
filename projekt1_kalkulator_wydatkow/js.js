const my_income = [];
const inputName = document.querySelector("#my-income");
const inputAmount = document.querySelector("#income-amount");
const incomeForm = document.querySelector("#form-income");
const incomeList = document.querySelector("#list-income");

const addIncome = () => {
  if (inputName.value === "" || inputAmount.value === "") {
    alert("wartości nie mogą być puste");
  } else if (inputAmount.value < 0.01) {
    alert("wartość musi być dodatnia");
    inputAmount.value = "";
  } else {
    const newIncome = {
      incomeName: inputName.value,
      incomeValue: inputAmount.value,
      id: (Math.random() * 10000).toFixed(0),
    };
    my_income.push(newIncome);

    renderIncome();

    sumTotal();
  }
};

incomeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addIncome();
});

const renderIncome = () => {
  incomeList.innerHTML = "";

  my_income.forEach((incomeObject, index) => {
    let nameIncome = incomeObject.incomeName;
    let amountIncome = incomeObject.incomeValue;

    const listElement = document.createElement("li");
    const listItemContainer = document.createElement("div");
    const listText = document.createElement("div");
    const listButtons = document.createElement("div");
    const buttonEdit = document.createElement("button");
    const buttonDelete = document.createElement("button");

    listItemContainer.classList.add("list-item-income");
    listButtons.classList.add("buttons");
    buttonEdit.classList.add("button-edit");
    buttonDelete.classList.add("button-delete");
    listText.classList.add("list-text");

    listText.textContent = `${nameIncome} - ${amountIncome} pln`;

    buttonEdit.textContent = "edytuj";
    buttonDelete.textContent = "usuń";

    buttonDelete.addEventListener("click", () => {
      removeItem(my_income[index], "income");
    });

    buttonEdit.addEventListener("click", () => {
      buttonEdit.classList.add("hidden");
      buttonDelete.classList.add("hidden");
      listText.classList.add("hidden");
      const editName = document.createElement("input");
      const editAmount = document.createElement("input");
      const editContainer = document.createElement("div");
      const accept = document.createElement("button");
      const cancel = document.createElement("button");
      editName.classList.add("edit-name");
      editAmount.classList.add("edit-amount");
      editContainer.classList.add("edit-container");
      accept.classList.add("button-accept");
      cancel.classList.add("button-cancel");

      accept.textContent = "zapisz";
      cancel.textContent = "anuluj";

      editName.value = nameIncome;
      editAmount.value = amountIncome;

      editContainer.appendChild(editName);
      editContainer.appendChild(editAmount);
      listItemContainer.insertBefore(editContainer, listButtons);

      listButtons.appendChild(accept);

      listButtons.appendChild(cancel);
      cancel.addEventListener("click", renderIncome);
      accept.addEventListener("click", () => {
        if (editName.value === "" || editAmount.value === "") {
          alert("wartości nie mogą być puste");
        } else if (editAmount.value < 0.01) {
          alert("wartość musi być dodatnia");
          editAmount.value = "";
        } else {
          const editedIncomeTableItem = (editedObject) => {
            editedObject.incomeName = editName.value;
            editedObject.incomeValue = editAmount.value;
          };

          my_income.map((editedTableItem) => {
            if (editedTableItem.id === incomeObject.id) {
              editedIncomeTableItem(editedTableItem);
            } else {
              editedTableItem;
            }
          });
          sumTotal();
          renderIncome();
        }
      });
    });

    incomeList.appendChild(listElement);
    listElement.appendChild(listItemContainer);
    listItemContainer.appendChild(listText);
    listItemContainer.appendChild(listButtons);
    listButtons.appendChild(buttonEdit);
    listButtons.appendChild(buttonDelete);
  });

  inputName.value = "";
  inputAmount.value = "";
};

const my_expenses = [];
const expensesList = document.querySelector("#list-expenses");
const expenseName = document.querySelector("#my-expenses");
const expenseAmount = document.querySelector("#expense-amount");
const expenseForm = document.querySelector("#form-expenses");

const addExpense = () => {
  if (expenseName.value === "" || expenseAmount.value === "") {
    alert("wartości nie mogą być puste");
  } else if (expenseAmount.value < 0.01) {
    alert("wartość musi być dodatnia");
    expenseAmount.value = "";
  } else {
    const newExpense = {
      expenseName: expenseName.value,
      expenseValue: expenseAmount.value,
      id: (Math.random() * 10000).toFixed(0),
    };
    my_expenses.push(newExpense);
    renderExpenses();

    sumTotal();
  }
};

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addExpense();
});

const renderExpenses = () => {
  expensesList.innerHTML = "";
  my_expenses.forEach((expenseObject, index) => {
    let nameExpense = expenseObject.expenseName;
    let amountExpense = expenseObject.expenseValue;

    const listElement = document.createElement("li");
    const listItemContainer = document.createElement("div");
    const listText = document.createElement("div");
    const listButtons = document.createElement("div");
    const buttonEdit = document.createElement("button");
    const buttonDelete = document.createElement("button");

    listItemContainer.classList.add("list-item-expenses");
    listButtons.classList.add("buttons");
    buttonEdit.classList.add("button-edit");
    buttonDelete.classList.add("button-delete");

    listText.textContent = `${nameExpense} - ${amountExpense} pln`;

    buttonEdit.textContent = "edytuj";
    buttonDelete.textContent = "usuń";

    buttonDelete.addEventListener("click", () => {
      removeItem(my_expenses[index], "expense");
    });

    buttonEdit.addEventListener("click", () => {
      buttonEdit.classList.add("hidden");
      buttonDelete.classList.add("hidden");
      listText.classList.add("hidden");
      const editName = document.createElement("input");
      const editAmount = document.createElement("input");
      const editContainer = document.createElement("div");
      const accept = document.createElement("button");
      const cancel = document.createElement("button");
      editName.classList.add("edit-name");
      editAmount.classList.add("edit-amount");
      editContainer.classList.add("edit-container");
      accept.classList.add("button-accept");
      cancel.classList.add("button-cancel");

      accept.textContent = "zapisz";
      cancel.textContent = "anuluj";
      editName.value = nameExpense;
      editAmount.value = amountExpense;
      editContainer.appendChild(editName);
      editContainer.appendChild(editAmount);
      listItemContainer.insertBefore(editContainer, listButtons);

      listButtons.appendChild(accept);
      listButtons.appendChild(cancel);
      cancel.addEventListener("click", renderExpenses);

      accept.addEventListener("click", () => {
        if (editName.value === "" || editAmount.value === "") {
          alert("wartości nie mogą być puste");
        } else if (editAmount.value < 0.01) {
          alert("wartość musi być dodatnia");
          editAmount.value = "";
        } else {
          const editedExpensesTableItem = (editedObject) => {
            editedObject.expenseName = editName.value;
            editedObject.expenseValue = editAmount.value;
          };
          my_expenses.map((editedTableItem) => {
            editedTableItem.id === expenseObject.id
              ? editedExpensesTableItem(editedTableItem)
              : editedTableItem;
          });
          sumTotal();
          renderExpenses();
        }
      });
    });

    expensesList.appendChild(listElement);
    listElement.appendChild(listItemContainer);
    listItemContainer.appendChild(listText);
    listItemContainer.appendChild(listButtons);
    listButtons.appendChild(buttonEdit);
    listButtons.appendChild(buttonDelete);
  });
  expenseName.value = "";
  expenseAmount.value = "";
};

const removeItem = (item, type) => {
  if (type === "income") {
    const itemToRemove = my_income.findIndex(
      (incomeParameter) => incomeParameter.id == item.id
    );

    my_income.splice(itemToRemove, 1);

    renderIncome();

    sumTotal();
  } else {
    const itemToRemove = my_expenses.findIndex(
      (expensesParameter) => expensesParameter.id == item.id
    );
    my_expenses.splice(itemToRemove, 1);
    renderExpenses();

    sumTotal();
  }
};

const totalIncomeText = document.querySelector(".total-income");

const totalExpensesText = document.querySelector(".total-expenses");

const accountBalanceText = document.querySelector("#account-balance");

const sumTotal = () => {
  let incomeTotal = 0;
  my_income.forEach((incomeObject) => {
    incomeTotal += Number(incomeObject.incomeValue);
  });
  totalIncomeText.innerHTML = `SUMA PRZYCHODÓW : ${incomeTotal} pln`;

  let expensesTotal = 0;
  my_expenses.forEach((expenseObject) => {
    expensesTotal += Number(expenseObject.expenseValue);
  });
  totalExpensesText.innerHTML = `SUMA WYDATKÓW : ${expensesTotal} pln`;

  let accountBalance = 0;
  accountBalance = incomeTotal - expensesTotal;

  if (accountBalance > 0) {
    accountBalanceText.innerHTML = `MOŻESZ JESZCZE WYDAĆ : ${accountBalance} pln`;
  } else if (accountBalance === 0) {
    accountBalanceText.innerHTML = `TWÓJ BILANS WYNOSI 0`;
  } else if (accountBalance < 0) {
    accountBalanceText.innerHTML = `Bilans jest ujemny, Jesteś na minusie : ${
      accountBalance * -1
    } pln`;
  }
};
