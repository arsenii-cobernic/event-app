const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.events = require("./events.model.js")(mongoose);
db.userEvents = require("./userEvents.model.js")(mongoose);

module.exports = db;