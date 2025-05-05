import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login"); // Certifique-se de ter uma view chamada 'login.ejs'
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("DADOS RECEBIDOS:", req.body); // ← Isso vai garantir que o e-mail e a senha estão sendo recebidos

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log(`Usuário não encontrado: ${email}`); // Log para confirmar que não encontramos o usuário
      return res.status(400).json({ error: 'Usuário não encontrado!' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);



    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Senha incorreta!' });
    }

    res.redirect("/index");

  } catch (error) {
    console.log("Erro no servidor:", error);
    res.status(500).json({ error: 'Erro no servidor!' });
  }
});

export default router;
