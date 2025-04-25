import express from "express";
import Hortalicas from "../models/hortalicas.js";

const router = express.Router();

// Mostrar o formulário de cadastro de hortalica
router.get("/registerHortalica", async (req, res) => {
  try {
    const gestaoHortalicas = await Hortalicas.findAll();
    res.render("registerHortalica", { gestaoHortalicas });
  } catch (err) {
    console.error("Erro ao carregar hortaliças:", err);
    res.status(500).send("Erro ao carregar hortaliças.");
  }
});



// ✅ Rota POST para salvar no banco
router.post("/hortalicas", async (req, res) => {
  console.log("DADOS RECEBIDOS:", req.body);

  const {
    nome_hortalica = null,
    tempo_estimado = null,
    tempo_real = null,
    tipo_hortalica,
  } = req.body;

  try {
    await Hortalicas.create({
      nome_hortalica,
      tempo_estimado,
      tempo_real,
      tipo_hortalica,
    });

    console.log("Hortaliça salva com sucesso!");
    res.redirect("/registerHortalica");
  } catch (err) {
    console.error("Erro ao salvar no banco:", err);
    res.status(500).send("Erro ao salvar no banco.");
  }
});

export default router;
