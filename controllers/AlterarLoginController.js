import express from "express";
import User from '../models/user.js';  // Certifique-se de importar seu modelo de usuário
import passport from 'passport';

const router = express.Router();

// Rota para exibir a página de alteração de login
router.get("/alterarLogin", (req, res) => {
  const userId = req.user ? req.user.id : null;  // Verifica se o usuário está autenticado

  // Passa o userId para o template 'alterarLogin.ejs'
  res.render("alterarLogin", { user: { id: userId } });
});

// Rota para excluir a conta
router.post("/delete-account", async (req, res) => {
  const userId = req.user ? req.user.id : null;  // Verifica se o usuário está autenticado
  
  console.log("User ID:", userId);  // Adicionando para depuração

  if (!userId) {
    return res.status(401).json({ error: 'Usuário não autenticado!' });
  }

  try {
    const user = await User.findByPk(userId);  // Tenta encontrar o usuário pelo ID

    if (!user) {
      // Se não encontrar o usuário, retorna erro
      return res.status(404).json({ error: 'Usuário não encontrado!' });
    }

    await user.destroy();  // Exclui o usuário
    res.json({ message: 'Conta excluída com sucesso!' });  // Retorna sucesso
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro no servidor!' });  // Se houver erro no servidor
  }
});

export default router;
