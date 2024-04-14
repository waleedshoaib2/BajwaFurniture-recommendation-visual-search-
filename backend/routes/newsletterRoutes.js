import express from "express";
import {
  sendNewsletters,
  sendNewsletterToUser,
} from "../controllers/newsletterSubscription.js";
const router = express.Router();

router.post("/", sendNewsletters);
router.post("/email", sendNewsletterToUser);

export default router;
