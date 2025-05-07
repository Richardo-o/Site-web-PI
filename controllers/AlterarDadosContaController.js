import express from "express";

const router = express.Router(); 

router.get("/alterarDadosConta", (req,res)=>{

    res.render('alterarDadosConta');
    
});


export default router;