const db = require("../../connection/conn");
const util = require("util");
const query = util.promisify(db.query).bind(db);
// const finderTodo = require("./finderTodo");
const { lowerCaseHandler } = require("../../utils/lowerCaseHandler");
const { showData } = require("../../utils/showData");
const { validData } = require("../../utils/validData");

module.exports = {
  put: async (req, res) => {
    try {
      // mengambil data dari req.param
      const { id } = req.params;
      const body = req.body;

      // validasi data
      find = await validData(id);

      // if (find.length == 0) {
      //   res.status(404).send({
      //     isSuccess: false,
      //     message: "Data Not Found",
      //   });
      //   return null;
      // }

      // menjadikan body lowercase
      const { task, status } = lowerCaseHandler(body);

      // update ke database todolist
      await query(
        `update todo_list set Task = '${task}', Status = "${status}" where no = ${id}`
      );

      // data update
      let updateData = await showData();

      // memberikan response ke client
      res.status(201).send({
        isSuccess: true,
        message: "update todoList successfuly",
        data: updateData,
      });
    } catch (error) {
      res.status(404).send({
        isSuccess: false,
        message: "data not found",
        data: null,
      });
    }
  },
  patch: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const length = Object.keys(body);

      // validasi data
      find = await validData(id);

      let queries = []; // {nama : belajar}, {status : complite}

      for (let key in body) {
        queries.push(`${key} = '${body[key]}'`);
      }

      // Update Data
      find = `update todo_list set ${queries} where no = ${id}`;
      await query(find);

      // memberikan respon
      let updateData = await showData();

      res.status(200).send({
        isSuccess: true,
        message: "update data succesfully",
        data: updateData,
      });
    } catch (error) {
      res.status(404).send({
        isSuccess: false,
        message: "Data Not Found",
      });
      return null;
    }
  },
};
