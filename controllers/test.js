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

module.exports = {
  getTodo: async (req, res) => {
    // mengambil data dari database
    let list = await showData();

    // memberikan response
    res.status(201).send({
      isSuccess: true,
      message: "show todo list successfully",
      data: list,
    });
  },
  putTodo: async (req, res) => {
    // mengambil data dari req.param
    const { id } = req.params;
    const reqBody = req.body;

    // update ke database todolist
    let updateTodo = await query(
      `update todo_list set Task = '${reqBody.Task}', Status = "${reqBody.Status}" where no = ${id}`
    );

    // data update
    let dataUpdate = await showData();

    // memberikan response ke client
    res.status(201).send({
      isSuccess: true,
      message: "update todoList successfuly",
      data: dataUpdate,
    });
  },
  patchTodo: async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const length = Object.keys(body);

    const newBody = {};
    for (const key in body) {
      const lowerCaseKey = key.toLowerCase();
      newBody[lowerCaseKey] = body[key];
    }

    const { status, task } = newBody;

    let queries = "";

    if (task) {
      queries += ` Task = "${task}",`;
    }

    if (status) {
      queries += ` Status = '${status}'`;
    }

    if (length.length == 1) {
      queries = queries.replace(",", "");
    }

    // Update Data
    find = `update todo_list set ${queries} where no = ${id}`;
    await query(find);

    // memberikan respon
    let getData = await query(`select * from todo_list`);

    res.status(201).send({
      isSuccess: true,
      message: "update data succesfully ",
      data: getData,
    });
  },
  postTodo: async (req, res) => {
    try {
      // mengambil data reques nya
      reqData = req.body;

      // menjadikan semua reqData lowercase

      newReqData = {};
      for (const key in reqData) {
        const lowerCaseKey = key.toLowerCase();
        newReqData[lowerCaseKey] = reqData[key];
      }

      // menyimpan ke database
      const { task, status } = newReqData;

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
      console.log(error);
    }
  },
};
