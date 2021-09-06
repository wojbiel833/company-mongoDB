const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Department = require("../../../models/department.model");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("DELETE /api/departments/:id", () => {
  before(async () => {
    const testDepOne = new Department({
      _id: "5d9f1140f10a81216cfd4408",
      name: "Department #1",
    });
    await testDepOne.save();
  });

  it("should remove chosen data", async () => {
    await Department.deleteMany();
    const res = await Department.find();

    expect(res.body).not.to.exist;
  });

  after(async () => {
    await Department.deleteMany();
  });
});
