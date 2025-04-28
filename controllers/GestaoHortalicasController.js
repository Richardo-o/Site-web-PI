import express from "express";
import Hortalicas from "../models/hortalicas.js";
import Fertilizantes from "../models/fertilizante.js";
import Nivel from "../models/nivel.js"; 

const router = express.Router();

// formulario de cadastro
router.get("/gestaoHortalicas", async (req, res) => {
  try {
    const gestaoHortalicas = await Hortalicas.findAll({
      include: [
        { model: Fertilizantes, as: "fertilizantes" },
        { model: Nivel, as: "niveis" }  // Certifique-se de que "niveis" está correto
      ]
    });
    res.render("gestaoHortalicas", { gestaoHortalicas });
  } catch (err) {
    console.error("Erro ao carregar gestão de hortaliças:", err);
    res.status(500).send("Erro ao carregar gestão de hortaliças.");
  }
});


// Rota tabela
router.get("/gestaoHortalicas", async (req, res) => {
  try {
    const gestaoHortalicas = await Hortalicas.findAll({
      include: [
        { model: Fertilizantes, as: "fertilizantes" },
        { model: Nivel, as: "niveis" }
      ]
    });
    res.render("gestaoHortalicas", { gestaoHortalicas });
  } catch (err) {
    console.error("Erro ao carregar gestão de hortaliças:", err);
    res.status(500).send("Erro ao carregar gestão de hortaliças.");
  }
});

// Salvar hortaliça
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

// Rota de Exclusão
router.get("/gestaoHortalicas/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    
    await Fertilizantes.destroy({
      where: { id_hortalica: id }
    });

  
    await Hortalicas.destroy({
      where: { id_hortalica: id }
    });

    console.log(`Hortaliça e fertilizantes com ID ${id} excluídos com sucesso!`);
    res.redirect("/gestaoHortalicas");
  } catch (error) {
    console.error("Erro ao excluir:", error);
    res.status(500).send("Erro ao excluir a hortaliça.");
  }
});

export default router;
