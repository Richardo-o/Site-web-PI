import express from "express";
const router = express.Router();

// Rota do Dashboard (ou outra página onde quer exibir o nome)
router.get("/dashboard", async (req, res) => {
  const firstname = req.session.firstname;

  if (!firstname) {
    return res.redirect('/login');
  }

  res.render("dashboard", { firstname });
});


    export default router;