import chai, { expect } from "chai";

import sinonChai from "sinon-chai";
import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} from "sequelize-test-helpers";

import UserModel from "../../models/user";

chai.use(sinonChai);
describe("src/models/user", () => {
  const User = UserModel(sequelize, dataTypes);
  const user = new User();
  checkModelName(User)("Users");
  context("properties", () => {
    ["email", "username", "password", "accountNo", "globalBalance"].forEach(
      checkPropertyExists(user),
    );
  });
});
