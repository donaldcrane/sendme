import chai from "chai";
import chaiHttp from "chai-http";
import db from "../../models/index";
import { user4 } from "./user-sign-in-test-data";
import {
  credit, credit2, credit3, credit4, credit5
} from "./credit-data";
import server from "../../app";

chai.should();

const { expect } = chai;
chai.use(chaiHttp);

describe("Add credit", () => {
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
  it("should allow user with token add a credit", done => {
    chai
      .request(server)
      .post("/api/v1/auth/credit")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send(credit)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it("should not allow user add a credit with incomplete details", done => {
    chai
      .request(server)
      .post("/api/v1/auth/credit")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send(credit2)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should not allow user without token add a credit ", done => {
    chai
      .request(server)
      .post("/api/v1/auth/credit")
      .send(credit3)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe("Delete credit Transaction", () => {
  beforeEach(async () => {
    await db.Credits.destroy({
      where: {
      },
      trancate: {
        cascade: true,
      },
    });
    await db.Credits.create(credit4);
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
  it("should allow User Delete a credit Transaction", done => {
    chai
      .request(server)
      .delete("/api/v1/auth/credit/c375c640-81ff-405a-89a8-460ea2f71755")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Successfully Deleted transaction.");
        done();
      });
  });
  it("should not allow user delete a credit with invalid ID data type", done => {
    chai
      .request(server)
      .delete("/api/v1/auth/credit/8d58")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal("ID must be a UUID");
        done();
      });
  });
  it("returns 404 when deleting credit which is not in db", done => {
    chai
      .request(server)
      .delete("/api/v1/auth/credit/8d585465-cd80-4030-b665-bdc3bbd3e578")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal("Transaction not found.");
        done();
      });
  });
});

describe("GET credit api route", () => {
  beforeEach(async () => {
    await db.Credits.destroy({
      where: {
      },
      trancate: {
        cascade: true,
      },
    });
    await db.Credits.create(credit4);
    await db.Credits.create(credit5);
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
  it("returns all credits", done => {
    chai
      .request(server)
      .get("/api/v1/auth/credits")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        const { status, body } = res;
        const { data } = body;
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.message).to.equal("Successfully retrived all Credit Transactions.");

        data.forEach(credits => {
          expect(credits).to.have.property("id");
          expect(credits).to.have.property("userId");
          expect(credits).to.have.property("amount");
          expect(credits).to.have.property("transactionType");
          expect(credits).to.have.property("senderName");
        });

        expect(data).to.have.length(2);

        expect(data).to.be.an("array");
        done();
      });
  });

  it("returns credit with specific id", done => {
    chai
      .request(server)
      .get("/api/v1/auth/credit/c375c640-81ff-405a-89a8-460ea2f71755")
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
        expect(data).to.have.property("transactionType");
        expect(data).to.have.property("senderName");

        expect(data).to.be.an("object");
        done();
      });
  });
});
