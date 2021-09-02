const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 2 },
  lastName: { type: String, required: true, minlength: 2 },
  department: { type: String, ref: "Department" },
});

module.exports = mongoose.model("Employee", employeeSchema);
