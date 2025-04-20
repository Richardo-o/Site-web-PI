import express from "express";
import Hortalicas from "../models/hortalicas.js";

const router = express.Router();

router.get("/registerHortalica", (req, res) => {
  res.render("registerHortalica");
});

router.post("/hortalicas", async (req, res) => {
  console.log("DADOS RECEBIDOS:", req.body); // debug no terminal

  const {
    nome_hortalica,
    tempo_estimado = null, // valor padrão se não vier
    tempo_real = null,
    tipo_hortalica = "Não informado"
  } = req.body;

  try {
    await Hortalicas.create({
      nome_hortalica,
      tempo_estimado,
      tempo_real,
      tipo_hortalica
    });

    console.log("Hortaliça salva com sucesso!");
    res.redirect("/registerHortalica");
  } catch (err) {
    console.error("Erro ao salvar no banco:", err);
    res.status(500).send("Erro ao salvar no banco.");
  }
});

export default router;
