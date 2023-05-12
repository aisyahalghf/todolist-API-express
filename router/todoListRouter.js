const express = require("express");
const Router = express.Router();

// import controller
const {
  finderTodo,
  updaterTodo,
  createrTodo,
  removerTodo,
} = require("../controllers/todoListController");
const {
  findWithQuery,
} = require("../controllers/todoListController/FinderTodo");

// Router.get("/", async (req, res) => {
//   const dataTodo = await finderTodo.findAll();
//   if (!dataTodo) {
//     res.status(401).send({
//       isSuccess: false,
//       message: "Data not found",
//     });
//   }
//   res.status(201).send({
//     isSuccess: true,
//     message: "sukses",
//     data: dataTodo,
//   });
// });
Router.get("/", finderTodo.findAll);
Router.get("/:id", finderTodo.findWithParams);
Router.put("/:id", updaterTodo.put);
Router.patch("/:id", updaterTodo.patch);
Router.post("/", createrTodo.post);
Router.delete("/:id", removerTodo.delete);

module.exports = Router;
