import { getAllBooks, getUserBooks } from "controllers/books";
import express from "express";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:userId/books", getUserBooks);

export default router;
