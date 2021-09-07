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

    const testDepTwo = new Department({
      _id: "5d9f1159f81ce8d1ef2bee48",
      name: "Department #2",
    });
    await testDepTwo.save();
  });

  it("should remove chosen data", async () => {
    await request(server).delete("/api/departments/5d9f1140f10a81216cfd4408");
    const res = await Department.find();

    expect(res[0].name).to.be.equal("Department #2");
    expect(res.length).to.be.equal(1);
  });

  after(async () => {
    await Department.deleteMany();
  });
});
