
const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.skill_humans = require("./skill_matrix_human.js")(mongoose);
db.skill_robots = require("./skill_matrix_robot.js")(mongoose);
db.criteria = require("./criteria_catalogue.js")(mongoose);
db.assembly_sequence_plan_details = require("./assembly_sequence_plan_details.js")(mongoose);
db.dimension_per_component = require("./dimension_per_component.js")(mongoose);
db.working_area = require("./working_area.js")(mongoose);
db.assembly_sequence_step_detail = require("./assembly_sequence_step_detail.js")(mongoose)
// sensors
db.heart_rate= require("./heart_rate_sensor.js")(mongoose);
db.brain_sensor= require("./brain_sensor.js")(mongoose);
db.imu_sensor= require("./imu_sensor.js")(mongoose);
db.skin_sensor= require("./skin_sensor.js")(mongoose);
module.exports = db;