import express from "express";
import Hortalicas from "../models/hortalicas.js";
import Fertilizantes from "../models/fertilizante.js"; // importe aqui

const router = express.Router();

router.get("/gestaoHortalicas", async (req, res) => {
  try {
    const gestaoHortalicas = await Hortalicas.findAll({
      include: [{
        model: Fertilizantes,
        as: 'fertilizantes', // aqui nomeamos
        required: false
      }]
    });

    res.render("gestaoHortalicas", { gestaoHortalicas });
  } catch (err) {
    console.error("Erro ao carregar gestão:", err);
    res.status(500).send("Erro ao carregar gestão.");
  }
});
export default router;
