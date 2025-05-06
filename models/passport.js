import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user.js';  // O modelo de usuário

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });  // Ou qualquer outra forma de busca
      
      if (!user) {
        return done(null, false, { message: 'Usuário não encontrado' });
      }

      // Verifique a senha (aqui você pode usar bcrypt ou outra estratégia de hash)
      if (user.password !== password) {
        return done(null, false, { message: 'Senha incorreta' });
      }

      return done(null, user);  // Autenticação bem-sucedida
    } catch (error) {
      return done(error);
    }
  }
));

// Serializa o usuário para a sessão
passport.serializeUser((user, done) => {
  done(null, user.id);  // Aqui você pode armazenar o ID do usuário na sessão
});

// Desserializa o usuário a partir do ID
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);  // Recupera o usuário a partir do ID
    done(null, user);
  } catch (error) {
    done(error);
  }
});
