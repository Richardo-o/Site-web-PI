import express from "express";
import Hortalicas from "../models/hortalicas.js";

const router = express.Router();

// Formulário para cadastrar hortaliça
router.get("/registerHortalica", async (req, res) => {
  try {
    const gestaoHortalicas = await Hortalicas.findAll();
    res.render("registerHortalica", { gestaoHortalicas });
  } catch (err) {
    console.error("Erro ao carregar hortaliças:", err);
    res.status(500).send("Erro ao carregar hortaliças.");
  }
});

// Cadastro da hortaliça (POST)
router.post("/hortalicas", async (req, res) => {
  const { nome_hortalica, tempo_estimado, tempo_real, tipo_hortalica } = req.body;

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
    console.error("Erro ao salvar hortalica:", err);
    res.status(500).send("Erro ao salvar hortalica.");
  }
});

// 🔥 NOVA ROTA: Gestão de Hortalicas (listar todas)
router.get("/gestaoHortalicas", async (req, res) => {
  try {
    const gestaoHortalicas = await Hortalicas.findAll();
    res.render("gestaoHortalicas", { gestaoHortalicas });
  } catch (err) {
    console.error("Erro ao carregar a gestão de hortalicas:", err);
    res.status(500).send("Erro ao carregar a gestão.");
  }
});

export default router;
