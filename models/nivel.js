import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

// Definição do modelo Nivel
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

// Definir a associação após a definição do modelo Hortalicas
Nivel.associate = (models) => {
  Nivel.belongsTo(models.Hortalicas, { foreignKey: 'id_hortalica', as: 'hortalica' });
};

export default Nivel;
