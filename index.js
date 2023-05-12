const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); // initilize body parser ---> untuk menerima requirest.body dari frontend

const PORT = 5000;

app.get("/", (req, res) => {
  res.status(200).send("welcome to our api");
});

const { todoListRouter } = require("./router");
app.use("/todo-list", todoListRouter);

app.listen(PORT, () => console.log("Api running on port" + PORT));
