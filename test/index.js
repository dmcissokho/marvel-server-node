const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

const expect = chai.expect;

chai.use(chaiHttp);

describe("Characters API tests", () => {
  it("should return a 404 server error", done => {
    chai
      .request(app)
      .get("/comics")
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it("should return a 200 status code", done => {
    chai
      .request(app)
      .get("/api/v1/characters")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});