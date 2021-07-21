import chai from "chai";
import chaiHttp from "chai-http";
import db from "../../models/index";
import { user4 } from "./user-sign-in-test-data";
import {
  debit, debit2, debit3, debit4, debit5
} from "./debit-data";
import server from "../../app";

chai.should();

const { expect } = chai;
chai.use(chaiHttp);

describe("Add debit Transaction", () => {
  let userToken;
  before(done => {
    chai
      .request(server)
      .post("/api/v1/users/signin")
      .set("Accept", "application/json")
      .send(user4)
      .end((err, res) => {
        if (err) throw err;
        userToken = res.body.data;
        done();
      });
  });
  it("should allow user with token add a debit", done => {
    chai
      .request(server)
      .post("/api/v1/auth/debit")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send(debit)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it("should not allow user add a debit with incomplete details", done => {
    chai
      .request(server)
      .post("/api/v1/auth/debit")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send(debit2)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should not allow user without token add a debit ", done => {
    chai
      .request(server)
      .post("/api/v1/auth/debit")
      .send(debit3)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe("Delete debit Transaction", () => {
  beforeEach(async () => {
    await db.Debits.destroy({
      where: {
      },
      trancate: {
        cascade: true,
      },
    });
    await db.Debits.create(debit4);
  });
  let userToken;
  before(done => {
    chai
      .request(server)
      .post("/api/v1/users/signin")
      .set("Accept", "application/json")
      .send(user4)
      .end((err, res) => {
        if (err) throw err;
        userToken = res.body.data;
        done();
      });
  });
  it("should allow User Delete a debit Transaction", done => {
    chai
      .request(server)
      .delete("/api/v1/auth/debit/c375c640-81ff-405a-89a8-460ea2f71875")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Successfully Deleted transaction.");
        done();
      });
  });
  it("should not allow user delete a debit with invalid ID data type", done => {
    chai
      .request(server)
      .delete("/api/v1/auth/debit/8d58")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal("ID must be a UUID");
        done();
      });
  });
  it("returns 404 when deleting debit which is not in db", done => {
    chai
      .request(server)
      .delete("/api/v1/auth/debit/8d585465-cd80-4030-b665-bdc3bbd3e578")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal("Transaction not found.");
        done();
      });
  });
});

describe("GET Debit Transactions api route", () => {
  beforeEach(async () => {
    await db.Debits.destroy({
      where: {
      },
      trancate: {
        cascade: true,
      },
    });
    await db.Debits.create(debit4);
    await db.Debits.create(debit5);
  });
  let userToken;
  before(done => {
    chai
      .request(server)
      .post("/api/v1/users/signin")
      .set("Accept", "application/json")
      .send(user4)
      .end((err, res) => {
        if (err) throw err;
        userToken = res.body.data;
        done();
      });
  });
  it("returns all debits Transactions", done => {
    chai
      .request(server)
      .get("/api/v1/auth/debits")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        const { status, body } = res;
        const { data } = body;
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.message).to.equal("Successfully retrived all Debit Transactions.");

        data.forEach(debits => {
          expect(debits).to.have.property("id");
          expect(debits).to.have.property("userId");
          expect(debits).to.have.property("amount");
          expect(debits).to.have.property("receiverAccount");
          expect(debits).to.have.property("receiverName");
          expect(debits).to.have.property("transactionType");
        });

        expect(data).to.have.length(2);

        expect(data).to.be.an("array");
        done();
      });
  });

  it("returns debit with specific id", done => {
    chai
      .request(server)
      .get("/api/v1/auth/debit/c375c640-81ff-405a-89a8-460ea2f71875")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        const { status, body } = res;
        const { data } = body;
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.message).to.equal("Successfully retrived Transaction.");
        expect(data).to.have.property("id");
        expect(data).to.have.property("userId");
        expect(data).to.have.property("amount");
        expect(data).to.have.property("receiverAccount");
        expect(data).to.have.property("receiverName");
        expect(data).to.have.property("transactionType");

        expect(data).to.be.an("object");
        done();
      });
  });
});
