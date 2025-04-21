import express from "express";
const router = express.Router();

router.get("/gestaoHortalicas", (req, res) => {
  res.render("gestaoHortalicas");
});

export default router;