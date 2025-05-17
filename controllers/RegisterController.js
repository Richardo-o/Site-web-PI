import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { isAuthenticated } from './LoginController.js';

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstname, lastname, email, phoneNumber, password, confirmPassword, gender } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'As senhas não coincidem!' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já registrado!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      phoneNumber,
      password: hashedPassword,
      gender,
    });

    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro no servidor!' });
  }
});

router.get("/register", (req, res) => {
  res.render("register"); 
});

router.post("/update-email", async (req, res) => {
  const { currentEmail, currentPassword, newEmail, newPassword } = req.body;

  try {
    // Encontrar o usuário pelo e-mail atual
    const user = await User.findOne({ where: { email: currentEmail } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado!' });
    }

    // Verificar se a senha atual está correta
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
    
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Senha atual incorreta!' });
    }

    // Atualizar e-mail e senha
    if (newEmail) {
      user.email = newEmail;
    }

    if (newPassword) {
    
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    // Salvar as alterações no banco de dados
    await user.save();

    res.redirect('/login')
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro no servidor!' });
  }

});

 

  router.post("/delete-account", isAuthenticated, async (req, res) => {

    console.log("Sessão atual:", req.session);
    const userId = req.session.userId;
  
    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado!' });
    }
  
    try {
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado!' });
      }
  
      await user.destroy();
      req.session.destroy(); // limpando a sessão
      res.json({ message: 'Conta deletada com sucesso!' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro no servidor!' });
    }

    
  });


  
  
  router.post("/user", async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword, phoneNumber, gender } = req.body;
  
    if (password !== confirmPassword) {
      return res.status(400).send("As senhas não coincidem!");
    }
  
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).send("E-mail já cadastrado!");
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await User.create({
        firstname,
        lastname,
        email,
        phoneNumber,
        password: hashedPassword,
        gender,
      });
  
      res.redirect("/login");
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro no servidor.");
    }
  });
  

export default router;
