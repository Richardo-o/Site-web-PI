import Fertilizantes from "./fertilizante.js";
import Hortalicas from "./hortalicas.js";
import Nivel from "./nivel.js";

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

// Nivel pertence a uma hortalica
// Hortalica tem muitos níveis
Hortalicas.hasMany(Nivel, {
  foreignKey: 'id_hortalica',
  as: 'niveis'
});

// Nível pertence a uma hortalica
Nivel.belongsTo(Hortalicas, {
  foreignKey: 'id_hortalica',
  as: 'hortalica'
});




export { Fertilizantes, Hortalicas, Nivel };
