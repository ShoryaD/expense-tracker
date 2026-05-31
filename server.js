const express = require("express");
const os = require("os");
const app = express();
app.use(express.json());

let expenses = [];

// Add expense
app.post("/expenses", (req, res) => {
  const { name, amount } = req.body;
  const expense = { id: expenses.length + 1, name, amount };
  expenses.push(expense);
  res.status(201).json(expense);
});

// List expenses (with pod info)
app.get("/expenses", (req, res) => {
  res.json({
    pod: os.hostname(), // shows which pod handled the request
    data: expenses,
  });
});

// Delete expense
app.delete("/expenses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  expenses = expenses.filter((e) => e.id !== id);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("Expense Tracker API running on port 3000");
});
