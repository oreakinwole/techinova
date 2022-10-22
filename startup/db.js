const sql = require("../models/db");

module.exports = function () {
  sql.query(
    `CREATE TABLE IF NOT EXISTS reminders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    date DATETIME
);
`,
    (err, data) => {
      if (data) console.log("Successfully created reminders table");
    }
  );
};
