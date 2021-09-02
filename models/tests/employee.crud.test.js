const Employee = require("../employee.model.js");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Employee", () => {
  before(async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/companyDBtest", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  });

  // Reading data
  describe("Reading data", () => {
    before(async () => {
      const testEmpOne = new Employee({ firstName: "John", lastName: "Doe" });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: "Amanda", lastName: "Doe" });
      await testEmpTwo.save();
    });

    // should return all the data with find method,
    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;

      expect(employees.length).to.equal(expectedLength);
    });

    //   should return proper document by various params with findOne method.
    it('should return proper document by "firstName " with "findOne" method', async () => {
      const employee = await Employee.findOne({ firstName: "John" });
      const expectedName = "John";
      expect(employee.firstName).to.be.equal(expectedName);
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  // Creating data
  describe("Creating data", () => {
    // should insert new document with insertOne method.
    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName: "Lee", lastName: "Chang" });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  // Updating data
  describe("Updating data", () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: "John", lastName: "Doe" });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: "Amanda", lastName: "Doe" });
      await testEmpTwo.save();
    });

    // should properly update one document with updateOne method,
    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne(
        { firstName: "Amanda", lastName: "Doe" },
        { $set: { firstName: "Amanda", lastName: "Chang" } }
      );

      const updatedEmployee = await Employee.findOne({
        firstName: "Amanda",
        lastName: "Chang",
      });
      expect(updatedEmployee).to.not.be.null;
    });

    // should properly update one document with save method,
    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: "Amanda" });
      employee.firstName = "Kasia";
      await employee.save();

      const updatedEmployee = await Employee.findOne({
        firstName: "Kasia",
      });
      expect(updatedEmployee).to.not.be.null;
    });

    // should properly update multiple documents with updateMany method.
    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: "Brown" } });
      const employees = await Employee.find({ firstName: "Brown" });
      expect(employees.length).to.be.equal(2);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  // Removing data
  describe("Removing data", () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: "John", lastName: "Doe" });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: "Amanda", lastName: "Doe" });
      await testEmpTwo.save();
    });

    // should properly remove one document with deleteOne method,

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: "Amanda" });
      const removeEmployee = await Employee.findOne({
        firstName: "Amanda",
      });
      expect(removeEmployee).to.be.null;
    });

    // should properly remove one document with remove method,

    it('should properly remove one document with "remove" method', async () => {
      const emplotee = await Employee.findOne({ firstName: "Amanda" });
      await emplotee.remove();

      const removedEmployee = await Employee.findOne({
        firstName: "Amanda",
      });
      expect(removedEmployee).to.be.null;
    });

    // should properly remove multiple documents with deleteMany method.
    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.equal(0);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });
});
