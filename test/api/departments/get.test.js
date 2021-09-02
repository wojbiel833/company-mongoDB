const chai = require("chai").expect;
const chaiHttp = require("chat-http");

const server = require("../../../server.js");

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

mongoose.connecy(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

describe("GET /api/departments", () => {
  it("/ should return all departments", () => {});

  it("/:id should return one department by :id ", () => {});

  it("/random should return one random department", () => {});
});
