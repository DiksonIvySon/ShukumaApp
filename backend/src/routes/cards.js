import express from "express";
import Card from "../models/Card.js";

const router = express.Router();

router.get("/random", async (req, res) => {
  const count = await Card.countDocuments();
  const random = Math.floor(Math.random() * count);
  const card = await Card.findOne().skip(random);

  res.json(card);
});

export default router;
