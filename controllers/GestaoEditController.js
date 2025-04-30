// Importando Express
import express from "express";
import Hortalicas from "../models/hortalicas.js";
import Nivel from "../models/nivel.js";
import Fertilizantes from "../models/fertilizante.js";

// Iniciando Express
const router = express.Router();

router.get("/gestaoEdit", async (req,res)=>{
    try {
        const gestaoHortalicas = await Hortalicas.findAll({
          include: [
            { model: Fertilizantes, as: "fertilizantes" },
            { model: Nivel, as: "niveis" },
          ],
        });
        res.render("gestaoEdit", { gestaoHortalicas });
      } catch (err) {
        console.error("Erro ao carregar gestão de hortaliças:", err);
        res.status(500).send("Erro ao carregar gestão de hortaliças.");
      }

})


export default router;