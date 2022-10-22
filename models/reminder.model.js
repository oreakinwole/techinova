const sql = require("./db.js");

// constructor
const Reminder = function (payload) {
  this.user = payload.user;
  this.description = payload.description;
  this.date = payload.date;
};

Reminder.create = (payload, result) => {
  sql.query(
    "INSERT INTO `reminders` SET `user` = ?, `description` = ?, `date` = ?",
    [payload.user, payload.description, payload.date],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

Reminder.getAll = (result) => {
  let query = "SELECT * FROM reminders";

  // if (title) {
  //   query += ` WHERE title LIKE '%${title}%'`;
  // }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("re: ", res);
    result(null, res);
  });
};

Reminder.findById = (id, result) => {
  sql.query(`SELECT * FROM reminders WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      // console.log("found reminder: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Reminder;
