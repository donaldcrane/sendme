import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} from "sequelize-test-helpers";
import chai, { expect } from "chai";

import sinonChai from "sinon-chai";
import DebitModel from "../../models/debit";

chai.use(sinonChai);

describe("src/models/debit", () => {
  const Debit = DebitModel(sequelize, dataTypes);
  const debit = new Debit();

  checkModelName(Debit)("Debits");
  context("properties", () => {
    ["userId", "amount", "transactionType", "receiverName", "receiverAccount"].forEach(
      checkPropertyExists(debit),
    );
  });
});
