import Admin from "../services/debit";
import { validation, validateId } from "../validations/debitValidation";

const {
  sendTransaction, getAllDebitsTransaction, findUser, accountExist, getTransactionById, sendReceiverMoney, deleteTransaction, updateGlobalBalance,
} = Admin;

/**
 * @class AdmintransactionController
 * @description create transaction, get all transactions, get a transaction, delete a transaction
 * @exports AdminController
 */
export default class AdminDebitController {
  /**
     * @param {object} req - The user request object
     * @param {object} res - The user response object
     * @returns {object} Success message
     */
  static async sendMoney(req, res) {
    try {
      const { id } = req.decoded;
      const { accountNo, amount } = req.body;
      const { error } = validation(req.body);
      if (error) {
        return res.status(400).json({ status: 400, error: error.message });
      }
      const user = await findUser(id);
      const { globalBalance } = user;
      if (globalBalance < amount) {
        return res.status(404).json({
          status: 400,
          error: "Sorry there is not enough money in your account."
        });
      }
      const userExist = await accountExist(accountNo);
      if (!userExist) {
        return res.status(404).json({ status: 400, error: "Account number does not exist" });
      }
      const { username } = userExist;
      const newTransaction = {
        userId: id, amount, receiverAccount: accountNo, receiverName: username
      };
      await updateGlobalBalance(id, amount);
      await sendReceiverMoney(userExist.id, amount);
      const sentTransaction = await sendTransaction(newTransaction);
      return res.status(201).json({ status: 201, message: "Amount has been sent successfully.", data: sentTransaction, });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  }

  /**
     * @param {object} req - The user request object
     * @param {object} res - The user response object
     * @returns {object} Success message
     */
  static async getDebits(req, res) {
    try {
      const transactions = await getAllDebitsTransaction();
      res.status(200).json({
        status: 200,
        message: "Successfully retrived all Debit Transactions.",
        data: transactions,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  }

  /**
     * @param {object} req - The user request object
     * @param {object} res - The user response object
     * @returns {object} Success message
     */
  static async getDebitById(req, res) {
    try {
      const { id } = req.params;
      const { error } = validateId({ id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const Transaction = await getTransactionById(id);
      if (!Transaction) return res.status(404).json({ status: 404, error: "Transaction not found" });
      return res.status(200).json({
        status: 200,
        message: "Successfully retrived Transaction.",
        data: Transaction,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        error: "Resource not found."
      });
    }
  }

  /**
     * @param {object} req - The user request object
     * @param {object} res - The user response object
     * @returns {object} Success message
     */
  static async deleteTransaction(req, res) {
    const { id } = req.params;
    try {
      const { error } = validateId({ id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const transaction = await getTransactionById(id);
      if (!transaction) return res.status(404).json({ status: 404, error: "Transaction not found." });
      await deleteTransaction(id);
      return res.status(200).json({
        status: 200,
        message: "Successfully Deleted transaction.",
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        error: "Resource not found.",
      });
    }
  }
}
