import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Rota para exibir a página de login
router.get("/login", (req, res) => {
  res.render("login");
});

// Rota para autenticar o usuário
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("DADOS RECEBIDOS:", req.body);

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log(`Usuário não encontrado: ${email}`);
      return res.status(400).json({ error: 'Usuário não encontrado!' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Senha incorreta!' });
    }

    req.session.userId = user.id; // Salva ID do usuário na sessão
    req.session.firstname = user.firstname; // Salva o firstname do usuário na sessão

    res.redirect("/index");
  } catch (error) {
    console.log("Erro no servidor:", error);
    res.status(500).json({ error: 'Erro no servidor!' });
  }
});

// Middleware de autenticação
export const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.status(401).json({ error: 'Usuário não autenticado!' });
};

// Middleware para carregar o nome do usuário na view
router.use((req, res, next) => {
  res.locals.firstname = req.session.firstname || null;
  next();
});

export default router;
