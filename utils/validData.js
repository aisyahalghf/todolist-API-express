const db = require("../connection/conn");
const util = require("util");
const query = util.promisify(db.query).bind(db);

const validData = async (id) => {
  // mengambil data database
  const validData = await query(`select * from todo_list where no = ${id}`);
  return validData;
};

module.exports = { validData };
