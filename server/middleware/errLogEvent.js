const { customLogEvent } = require("../utils/customLogEvent");

const errorEvents = (err, req, res, next) => {
  customLogEvent(`${err.name}\t${err.message}`, "errLog.txt");
  res.status(500).send(err.message);
};

module.exports = { errorEvents };
