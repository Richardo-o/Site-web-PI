import Fertilizantes from "./fertilizante.js";
import Hortalicas from "./hortalicas.js";

// Hortalica tem muitos fertilizantes
Hortalicas.hasMany(Fertilizantes, {
  foreignKey: 'id_hortalica',
  as: 'fertilizantes'
});

// Fertilizante pertence a uma hortalica
Fertilizantes.belongsTo(Hortalicas, {
  foreignKey: 'id_hortalica',
  as: 'hortalica'
});

export { Fertilizantes, Hortalicas };
