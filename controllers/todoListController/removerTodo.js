const db = require("../../connection/conn");
const util = require("util");
const query = util.promisify(db.query).bind(db);
const { showData } = require("../../utils/showData");
const { validData } = require("../../utils/validData");

module.exports = {
  delete: async (req, res) => {
    try {
      // mengambil id di req params
      const { id } = req.params;

      // validasi data
      const find = await validData(id);

      if (find.length == 0) {
        res.status(200).send({
          isSuccess: false,
          message: "Data not Found",
          data: null,
        });
        return null;
      }

      //   menghapus data di database berdasarkan id yang didapatkan
      await query(`delete from todo_list where no = ${id}`);

      // memberikan respon ke client
      newData = await showData();

      res.status(201).send({
        isSuccess: true,
        message: "delete data successfully",
        data: newData,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
