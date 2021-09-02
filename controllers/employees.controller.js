const Employee = require("../models/employee.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Employee.find().populate("department"));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const emp = await Employee.findOne().skip(rand).populate("department");
    if (!emp) res.status(404).json({ message: "Not found" });
    else res.json(emp);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id).populate("department");
    if (!emp) res.status(404).json({ message: "Not found" });
    else res.json(emp);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addOne = async (req, res) => {
  try {
    const { name } = req.body;
    const newEmployee = new Employee({ name: name });
    await newEmployee.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.changeOne = async (req, res) => {
  const { department } = req.body;

  try {
    const emp = await Employee.findById(req.params.id);
    if (emp) {
      await Employee.updateOne(
        { _id: req.params.id },
        { $set: { department: department } }
      );
      res.json({ message: "OK" });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (emp) await Employee.deleteOne({ _id: req.params.id });
    res.json({ message: `${emp} deleted!` });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
