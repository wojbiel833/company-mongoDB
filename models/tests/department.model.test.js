const mongoose = require("mongoose");
const expect = require("chai").expect;
const Department = require("../department.model.js");

describe("Department", () => {
  it('should throw an error if no "name" arg', () => {
    const dep = new Department({}); // create new Department, but don't set `name` attr value
    dep.validate((err) => {
      expect(err.errors.name).to.exist;
    });
  });
  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const dep = new Department({ name });
      dep.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
  });
  it("should throw an error if 'name' is too long or too short", () => {
    const cases = ["abc", "1234", "Lorem ipsum dolor amet"];
    for (let name of cases) {
      const dep = new Department({ name });
      dep.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
  });
  it('should not throw an error if "name" is okay', () => {
    const cases = ["Management", "Human Resources"];
    for (let name of cases) {
      const dep = new Department({ name });
      dep.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });
});
