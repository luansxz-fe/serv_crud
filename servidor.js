// const express = require("express");
import express from "express";

const PORT = 5000;
const app = express();
app.use(express.json())
let proximoID = 4
let LISTARALUNOS = [
    {
        id: 1, nome: "Luan"
    },
    {
        id: 2, nome: "Renan"
    },
    {
        id: 3, nome: "Hadassa"
    }
]
app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Hello World"
    })

})

app.get("/alunos", (req, res) => {
    res.status(200).json(LISTARALUNOS)
})

app.get("/alunos/:id", (req, res) => {
    const idParametro = Number(req.params.id);
    const aluno = LISTARALUNOS.filter(a => a.id === idParametro);

    if (!aluno) {
        return res.status(404).json({ msg: "Aluno não encontrado" })
    }
    res.status(200).json(aluno)

})

app.post("/alunos", (req, res) => {
    console.log(req.body)
    const { nome } = req.body
    if (!nome) {
        res.status(400).json({ msg: "Por gentizela complete o nome" })
    }
    const id = LISTARALUNOS.length > 0 ? LISTARALUNOS[LISTARALUNOS.length - 1].id + 1 : 1;
    const aluno = { id, nome };
    LISTARALUNOS.push(aluno)
    res.status(201).json({ msg: "Aluno criado com sucesso!!" })
})

app.delete("/alunos/", (req,res)=>{
    const idParametro = req.params.codigo? Number(req.params.codigo):0;
    console.log("Parametro: ", req.params);
    if (idParametro===0){
        return res.status(400).json({msg: "O parâmetro é obrigatório"})
    }
})
app.delete("/alunos/:codigo", (req, res) => {
    const idParametro = Number(req.params.codigo)
    const indiceAluno = LISTARALUNOS.findIndex(a => a.id === idParametro)

    if (indiceAluno === -1) {
        return res.status(404).json({ msg: "O aluno não encontrado" })

    }
    else{
    LISTARALUNOS.splice(indiceAluno, 1)
    res.status(200).json({ msg: "Aluno excluído!" })
    }
})

app.put("/alunos/", (req, res)=>{
    const idParametro = req.params.codigo? Number(req.params.codigo) : 0;
    console.log("Parametro: ", req.params);
    console.log("idParametro: ", idParametro)
    if (idParametro===0){
        return res.status(400).json({msg: "O parâmetro é obrigatório"});
    }
})

app.put("/alunos/:codigo", (req, res) => {
    const idParametro = Number(req.params.codigo)
    const indiceAluno = LISTARALUNOS.findIndex(a => a.id === idParametro)
    const { nome } = req.body

    if (indiceAluno === -1) {
        return res.status(404).json({ msg: "O aluno não encontrado" })
    }
    if (!nome) {
        return res.status(404).json({ msg: "Preencha o nome, por gentileza" })
    }
   

    LISTARALUNOS[indiceAluno] = {
        id: idParametro, nome
    }
    res.status(200).json({ msg: "Alteração feita com sucesso!", Indice: indiceAluno, })
})

app.listen(PORT, () => {
    console.log(`Servidor ONLINE in http://localhost:${PORT}`);
})






















































//function saudacao(){
//    return "hello world"
//}

//const saudacao = function(){
//    return "hello world"
//}

//const saud = () =>{
 //   return "hello world"
//