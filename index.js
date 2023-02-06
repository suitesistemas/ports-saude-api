const express    = require("express");
const app        = express();
const cors       = require("cors");

app.use(cors());
app.use(express.json());

app.get("/colaborador/listar/:cod_pessoa", (req, res) => {    
  return res.status(500).send(err);  
});

app.listen(3001, ()=>{
  console.log('Servidor Web no ar na porta 3001');
});
