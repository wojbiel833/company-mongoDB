const express = require("express");
const router = express.Router();
// const ObjectId = require("mongodb").ObjectId;
const Employee = require("../models/employee.model");

// router.get("/employees", (req, res) => {
//   req.db
//     .collection("employees")
//     .find()
//     .toArray((err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json(data);
//     });
// });

router.get("/employees", async (req, res) => {
  try {
    res.json(await Employee.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// router.get("/employees/random", (req, res) => {
//   req.db
//     .collection("employees")
//     .aggregate([{ $sample: { size: 1 } }])
//     .toArray((err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json(data[0]);
//     });
// });

router.get("/employees/random", async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const emp = await Employee.findOne().skip(rand);
    if (!emp) res.status(404).json({ message: "Not found" });
    else res.json(emp);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// router.get("/employees/:id", (req, res) => {
//   req.db
//     .collection("employees")
//     .findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else if (!data) res.status(404).json({ message: "Not found" });
//       else res.json(data);
//     });
// });

router.get("/employees/:id", async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) res.status(404).json({ message: "Not found" });
    else res.json(emp);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// router.post("/employees", (req, res) => {
//   const { name } = req.body;
//   req.db.collection("employees").insertOne({ name: name }, (err) => {
//     if (err) res.status(500).json({ message: err });
//     else res.json({ message: "OK" });
//   });
// });

router.post("/employee", async (req, res) => {
  try {
    const { name } = req.body;
    const newEmployee = new Employee({ name: name });
    await newEmployee.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// router.put("/employees/:id", (req, res) => {
//   const { name } = req.body;
//   req.db
//     .collection("employees")
//     .updateOne(
//       { _id: ObjectId(req.params.id) },
//       { $set: { name: name } },
//       (err) => {
//         if (err) res.status(500).json({ message: err });
//         else res.json({ message: "OK" });
//       }
//     );
// });

router.put("/employee/:id", async (req, res) => {
  const { name } = req.body;

  try {
    const emp = await Employee.findById(req.params.id);
    if (emp) {
      await Employee.updateOne(
        { _id: req.params.id },
        { $set: { name: name } }
      );
      res.json({ message: "OK" });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// router.delete("/employees/:id", (req, res) => {
//   req.db
//     .collection("employees")
//     .deleteOne({ _id: ObjectId(req.params.id) }, (err) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json({ message: "OK" });
//     });
// });

router.delete("/employee/:id", async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (emp) await Employee.deleteOne({ _id: req.params.id });
    res.json({ message: `${emp} deleted!` });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
