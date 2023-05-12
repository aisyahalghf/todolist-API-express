const db = require("../connection/conn");
const util = require("util");
const query = util.promisify(db.query).bind(db);

const showData = async () => {
  try {
    const getData = await query("select * from todo_list");
    return getData.map((value) => value);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { showData };
