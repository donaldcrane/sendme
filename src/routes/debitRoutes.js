import { Router } from "express";
import AdminDebitController from "../controllers/Debit";
import Authentication from "../middlewares/authenticate";

const router = Router();
const { verifyToken } = Authentication;
const {
  sendMoney, getDebitById, getDebits, deleteTransaction
} = AdminDebitController;

router.get("/debits", verifyToken, getDebits);
router.get("/debit/:id", verifyToken, getDebitById);

router.post("/debit", verifyToken, sendMoney);

router.delete("/debit/:id", verifyToken, deleteTransaction);

export default router;
