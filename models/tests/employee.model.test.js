const mongoose = require("mongoose");
const expect = require("chai").expect;
const Employee = require("../employee.model");

describe("Employee", () => {
  it('should throw an error if no "firtsName" and "lastName" arg', () => {
    const empl = new Employee({}); // create new Employee, but don't set `name` attr value

    empl.validate((err) => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
    });
  });

  it('should throw an error if "firtsName" and "lastName" is not a string', () => {
    const cases = [{}, []];

    for (let firstName of cases) {
      const empl = new Employee({ firstName });
      empl.validate((err) => {
        expect(err.errors.firstName).to.exist;
      });
    }

    for (let lastName of cases) {
      const empl = new Employee({ lastName });
      empl.validate((err) => {
        expect(err.errors.lastName).to.exist;
      });
    }
  });

  it('should throw an error if "firstName" or "lastName" is too too short', () => {
    const cases = ["a"];

    for (let firstName of cases) {
      let lastName = "Doe";
      const empl = new Employee({ firstName, lastName });
      empl.validate((err) => {
        expect(err.errors.firstName).to.exist;
      });
    }

    for (let lastName of cases) {
      let firstName = "John";
      const empl = new Employee({ firstName, lastName });
      empl.validate((err) => {
        expect(err.errors.lastName).to.exist;
      });
    }
  });

  it('should not throw an error if "firstName" and "lastName" is okay', () => {
    const cases1 = ["Joe", "Bran", "Dhaenerys"];
    const cases2 = ["Black", "Peanut", "Doe"];

    for (let firstName of cases1) {
      const empl = new Employee({ firstName });
      empl.validate((err) => {
        expect(err.errors.firstName).to.not.exist;
      });
    }

    for (let lastName of cases2) {
      const empl = new Employee({ lastName });
      empl.validate((err) => {
        expect(err.errors.lastName).to.not.exist;
      });
    }
  });
});
