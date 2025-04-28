import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

// Definição do modelo Hortalicas
const Hortalicas = connection.define('hortalicas', {
  id_hortalica: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nome_hortalica: {
    type: Sequelize.STRING,
    allowNull: true
  },
  tempo_estimado: {
    type: Sequelize.TIME,
  },
  tempo_real: {
    type: Sequelize.TIME,
  },
  tipo_hortalica: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  freezeTableName: true
});

// Definindo a associação após a definição de outros modelos
Hortalicas.associate = (models) => {
  Hortalicas.hasMany(models.Fertilizantes, { foreignKey: 'id_hortalica', as: 'fertilizantes' });
  Hortalicas.hasMany(models.Nivel, { foreignKey: 'id_hortalica', as: 'niveis' });
};

export default Hortalicas;
