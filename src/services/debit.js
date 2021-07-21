import database from "../models";

/**
 * @class Admin
 * @description allows admin user create and check Money details
 * @exports Admin
 */
export default class Admin {
  /**
   * @param {string} newTransaction - The Transaction details
   * @returns {object} An instance of the Transactions model class
   */
  static async sendTransaction(newTransaction) {
    try {
      return await database.Debits.create(newTransaction);
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} accountNo  - The user account number
   * @returns {object} - An instance of the Users model class
   */
  static async accountExist(accountNo) {
    try {
      return await database.Users.findOne({
        where: {
          accountNo
        }
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {string} id  - The user id
   * @returns {object} - An instance of the Users model class
   */
  static async findUser(id) {
    try {
      return await database.Users.findOne({
        where: {
          id
        }
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @returns {object} An instance of the Transactions model class
   */
  static async getAllDebitsTransaction() {
    try {
      return await database.Debits.findAll({ });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The transaction id
   * @returns {object} An instance of the Transactions model class
   */
  static async getTransactionById(id) {
    try {
      return await database.Debits.findOne({
        where: {
          id
        }
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The transaction name
   * @returns {object} An instance of the Transactions model class
   */
  static async deleteTransaction(id) {
    try {
      const Transaction = await database.Debits.findOne({ where: { id } });
      return await Transaction.destroy({ cascade: true });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The transaction id
   * @param {string} amount - The transaction amount
   * @returns {object} An instance of the Transactions model class
   */
  static async updateGlobalBalance(id, amount) {
    try {
      return await database.Users.increment({
        globalBalance: -amount
      }, {
        where: {
          id
        },
        returning: true,
        plain: true
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The transaction id
   * @param {string} amount - The transaction amount
   * @returns {object} An instance of the Transactions model class
   */
  static async sendReceiverMoney(id, amount) {
    try {
      return await database.Users.increment({
        globalBalance: +amount
      }, {
        where: {
          id
        },
        returning: true,
        plain: true
      });
    } catch (err) {
      throw err;
    }
  }
}
