import Admin from "../services/credit";
import { validation, validateId } from "../validations/creditValidation";

const {
  addTransaction, getAllIncomingTransaction, userExist, getTransactionById, deleteTransaction, updateGlobalBalance,
} = Admin;

/**
 * @class AdmintransactionController
 * @description create transaction, get all transactions, get a transaction, delete a transaction
 * @exports AdminController
 */
export default class AdminCreditController {
  /**
     * @param {object} req - The user request object
     * @param {object} res - The user response object
     * @returns {object} Success message
     */
  static async addMoney(req, res) {
    try {
      const { id } = req.decoded;
      const { amount } = req.body;
      const { error } = validation({ amount });
      if (error) {
        return res.status(400).json({ status: 400, error: error.message });
      }
      const User = await userExist(id);
      const { firstName, lastName } = User;
      const newTransaction = {
        userId: id, amount, senderName: `${firstName} ${lastName}`
      };
      await updateGlobalBalance(id, amount);
      const createdTransaction = await addTransaction(newTransaction);
      return res.status(201).json({ status: 201, message: "Amount has been added successfully.", data: createdTransaction, });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  }

  /**
     * @param {object} req - The user request object
     * @param {object} res - The user response object
     * @returns {object} Success message
     */
  static async getCredits(req, res) {
    try {
      const transactions = await getAllIncomingTransaction();
      res.status(200).json({
        status: 200,
        message: "Successfully retrived all Credit Transactions.",
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
  static async getCreditById(req, res) {
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
