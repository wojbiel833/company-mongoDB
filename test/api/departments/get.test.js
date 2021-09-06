const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");

const server = require("../../../server.js");
const Department = require("../../../models/department.model");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

const NODE_ENV = process.env.NODE_ENV;
let dbURL = "";

if (NODE_ENV === " production")
  dbURL =
    "mongodb+srv://wojbiel833:DBmongodbwojbiel@wojbiel833.p51y7.mongodb.net/wojbiel833?retryWrites=true&w=majority";
else if (NODE_ENV === "test") dbURL = "mongodb://localhost:27017/companyDBtest";
else dbURL = "mongodb://localhost:27017/companyDB";

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

describe("GET /api/departments", () => {
  before(async () => {
    const testDepOne = new Department({
      _id: "5d9f1140f10a81216cfd4408",
      name: "Department #1",
    });
    await testDepOne.save();

    const testDepTwo = new Department({
      _id: "5d9f1159f81ce8d1ef2bee48",
      name: "Department #2",
    });
    await testDepTwo.save();
  });

  it("/ should return all departments", () => {});

  it("/:id should return one department by :id ", () => {});

  it("/random should return one random department", () => {});

  after(async () => {
    await Department.deleteMany();
  });
});
