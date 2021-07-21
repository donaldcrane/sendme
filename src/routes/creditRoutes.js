import { Router } from "express";
import AdminCreditController from "../controllers/Credit";
import Authentication from "../middlewares/authenticate";

const router = Router();
const { verifyToken } = Authentication;
const {
  addMoney, getCreditById, getCredits, deleteTransaction
} = AdminCreditController;

router.get("/credits", verifyToken, getCredits);
router.get("/credit/:id", verifyToken, getCreditById);

router.post("/credit", verifyToken, addMoney);

router.delete("/credit/:id", verifyToken, deleteTransaction);

export default router;
