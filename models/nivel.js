import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const Nivel = connection.define('nivel', {
  id_nivel: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nivel_agua: {
    type: Sequelize.STRING,
    allowNull: true
  },
  id_hortalica: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true
});

export default Nivel;
Nivel.sync({ alter: true });