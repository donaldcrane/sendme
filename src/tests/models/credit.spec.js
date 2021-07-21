import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} from "sequelize-test-helpers";
import chai, { expect } from "chai";

import sinonChai from "sinon-chai";
import CreditModel from "../../models/credit";

chai.use(sinonChai);

describe("src/models/credit", () => {
  const Credit = CreditModel(sequelize, dataTypes);
  const credit = new Credit();

  checkModelName(Credit)("Credits");
  context("properties", () => {
    ["userId", "amount", "transactionType", "senderName"].forEach(
      checkPropertyExists(credit),
    );
  });
});
