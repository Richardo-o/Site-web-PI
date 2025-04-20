// Importando Express

import express from "express";

//Importando Rotas
import HortalicasController from "./controllers/HortalicasController.js";
import FertilizerController from "./controllers/FertilizerController.js";
import WaterLevelController from "./controllers/WaterLevelController.js";
// Iniciando express na variável app

const app = express();

// Configurando a view engine
app.set("view engine", "ejs");

// Servindo arquivos estáticos
app.use(express.static("public"));

// Rotas
app.use("/", HortalicasController);
app.use("/", FertilizerController);
app.use("/", WaterLevelController);

// Rota principal
app.get("/", (req, res) => {
  res.render("index");
});

// Inicialização do servidor
app.listen(8080, (error) => {
  if (error) {
    console.error("Erro ao iniciar o servidor:", error);
  } else {
    console.log("Servidor iniciado com sucesso na porta 8080!");
  }
});

//Importando o Sequelize-config com os dados da conexão
import connection from "./config/sequelize-config.js";

//Realizando a conexão com o banco de dados
//Then() -> trata o sucesso
//catch() -> trata a falha
connection.authenticate().then(() => {
  console.log("Conexão com o banco realizada com sucesso!");
}).catch((error) => {
  console.log(error)//conceito promisse
});

//Criando o banco de dados do projeto (se ele ainda não existir)
connection.query(`CREATE DATABASE IF NOT EXISTS greenrise;`).then(() => {
  console.log("O banco de dados está criado!");
}).catch((error) => {
  console.log(error);
});//abrir o Xampp e iniciar o servidor

import './models/hortalicas.js'
