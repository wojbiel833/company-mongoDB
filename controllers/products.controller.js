const Product = require("../models/product.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Product.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const prod = await Product.findOne().skip(rand);
    if (!prod) res.status(404).json({ message: "Not found" });
    else res.json(prod);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) res.status(404).json({ message: "Not found" });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addOne = async (req, res) => {
  try {
    const { name } = req.body;
    const newProduct = new Product({ name: name });
    await newProduct.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.changeOne = async (req, res) => {
  const { name } = req.body;

  try {
    const prod = await Product.findById(req.params.id);
    if (prod) {
      await Product.updateOne({ _id: req.params.id }, { $set: { name: name } });
      res.json({ message: "OK" });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const prod = await Products.findById(req.params.id);
    if (prod) await Products.deleteOne({ _id: req.params.id });
    res.json({ message: `${prod} deleted!` });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
