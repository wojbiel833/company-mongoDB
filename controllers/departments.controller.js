const Department = require("../models/department.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Department.find({}));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Department.findOne().skip(rand);
    if (!dep) res.status(404).json({ message: "Not found" });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);
    if (!dep) res.status(404).json({ message: "Not found" });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addOne = async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = new Department({ name: name });
    await newDepartment.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.changeOne = async (req, res) => {
  const { name } = req.body;

  try {
    const dep = await Department.findById(req.params.id);
    if (dep) {
      await Department.updateOne(
        { _id: req.params.id },
        { $set: { name: name } }
      ).then((res) => console.log(res));
      // wyswietlanie dokumentu ???
      res.json({ message: `${dep} was changed!` });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);
    if (dep)
      await Department.deleteOne({ _id: req.params.id }).then((res) =>
        console.log(res)
      );
    // wyswietlanie dokumentu ???
    res.json({ message: `${dep} deleted!` });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
