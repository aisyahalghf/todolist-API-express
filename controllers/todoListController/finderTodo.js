const db = require("../../connection/conn");
const util = require("util");
const query = util.promisify(db.query).bind(db);
const { validData } = require("../../utils/validData");
const { lowerCaseHandler } = require("../../utils/lowerCaseHandler");

module.exports = {
  findAll: async (req, res) => {
    try {
      // mengambil query dari req.query
      let body = req.query;
      let { task, status } = lowerCaseHandler(body);

      // mengambil data dari database

      let queries = "";

      if (task || status) {
        queries += "where";
      }

      if (task) {
        task = task.replace("%", " ");
        queries += ` and Task like '%${task}%' `;
      }
      if (status) {
        queries += ` and Status = '${status}'`;
      }
      if (!status && !task) {
        queries += "";
      }

      let newQueries = queries.replace("and", "");
      getData = await query(`select * from todo_list ${newQueries}`);

      // memberikan response

      res.status(201).send({
        isSuccess: true,
        message: "show todo list successfully",
        data: getData,
      });
      // return list;
    } catch (error) {
      res.status(403).send({
        isSuccess: false,
        message: "Data Not Found",
      });
    }
  },
  findWithParams: async (req, res) => {
    try {
      // mengambil id dari req.params
      const { id } = req.params;

      // getData berdasarkan id tsb
      findData = await validData(id);

      // memberikan respons ke client

      res.status(201).send({
        isSuccess: true,
        message: "find data by id successfully",
        data: findData,
      });
    } catch (error) {
      res.status(403).send({
        isSuccess: false,
        message: "Data Not Found",
      });
    }
  },
};
