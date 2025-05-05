// Importações iniciais
import express from "express";
import connection from "./config/sequelize-config.js"; // IMPORTAR ANTES DE USAR

// Importação de rotas e associações
import "./models/associations.js";
import HortalicasController from "./controllers/HortalicasController.js";
import FertilizerController from "./controllers/FertilizerController.js";
import WaterLevelController from "./controllers/WaterLevelController.js";
import AiAutomationController from "./controllers/AiAutomationController.js";
import DashboardController from "./controllers/DashboardController.js";
import GestaoHortalicasController from "./controllers/GestaoHortalicasController.js";
import GestaoEditController from "./controllers/GestaoEditController.js";
import RegisterController from "./controllers/RegisterController.js";
import LoginController from "./controllers/LoginController.js";
import "./models/hortalicas.js";
import IndexController from "./controllers/IndexController.js"

// Iniciando express
const app = express();

// Configurações do Express
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Rotas
app.get("/", (req, res) => {
  res.render("login");
});
app.use("/", HortalicasController);
app.use("/", FertilizerController);
app.use("/", WaterLevelController);
app.use("/", AiAutomationController);
app.use("/", DashboardController);
app.use("/", GestaoHortalicasController);
app.use("/", GestaoEditController);
app.use("/", RegisterController);
app.use("/", LoginController);
app.use("/", IndexController);

// Conexão e sincronização com o banco
connection.authenticate()
  .then(() => {
    console.log("✅ Conexão com o banco realizada com sucesso!");
    return connection.sync(); // sincroniza só após conectar
  })
  .then(() => {
    console.log("✅ Banco de dados sincronizado!");
  })
  .catch((error) => {
    console.error("❌ Erro na conexão ou sincronização do banco:", error);
  });

// Iniciar servidor
app.listen(8080, () => {
  console.log("🌱 Servidor iniciado com sucesso na porta 8080!");
});
