const db = require("../../connection/conn");
const util = require("util");
const query = util.promisify(db.query).bind(db);
const { lowerCaseHandler } = require("../../utils/lowerCaseHandler");
const { showData } = require("../../utils/showData");

module.exports = {
  post: async (req, res) => {
    try {
      // mengambil data reques nya
      body = req.body;

      // menjadikan semua reqData lowercase
      const { task, status } = lowerCaseHandler(body);

      await query(
        `insert into todo_list values (null, '${task}', '${status}')`
      );

      // memberikan respon kepada client
      const data = await showData();

      res.status(201).send({
        isSuccess: true,
        message: "adding data to database successfully",
        data: data,
      });
    } catch (error) {
      res.status(404).send({
        isSuccess: false,
        message: "data not found",
        data: null,
      });
    }
  },
};
