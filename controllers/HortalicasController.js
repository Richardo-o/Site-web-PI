import express from "express";
import Hortalicas from "../models/hortalicas.js";
import Fertilizantes from "../models/fertilizante.js";
import Nivel from "../models/nivel.js"; // Importa diretamente o arquivo

const router = express.Router();

// Mostrar o formulário de cadastro de hortalica
router.get("/registerHortalica", async (req, res) => {
  try {
    const gestaoHortalicas = await Hortalicas.findAll({
      include: [
        { model: Fertilizantes, as: "fertilizantes" },
        { model: Nivel, as: "niveis" }
      ]
    });
    res.render("registerHortalica", { gestaoHortalicas });
  } catch (err) {
    console.error("Erro ao carregar hortaliças:", err);
    res.status(500).send("Erro ao carregar hortaliças.");
  }
});

export default router;
