import express    from "express";
import mysql      from "mysql";
import cors       from "cors";
import uploaduser from './middlewares/uploadimage.js';

import fs         from "fs";
import https      from "https";

const app = express();

const db = mysql.createPool({
  host: "suitesistemas.cbtdu4gfiiub.us-east-1.rds.amazonaws.com",
  user: 'suite', //'root',
  password: '235901ss', //'masterkey',
  database: 'dados_ports_saude'
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin",  "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");

  next();
});

app.use(express.static('public/upload')); //Libera acesso a pasta de imagens*/

app.use(express.json());
app.use(cors());

/* tbl_pessoa - Colaborador*/
app.get("/colaborador/listar", (req, res) => {
  let lFiltro = ' where flg_colaborador = "S"';

  let SQL  = ' select *';
      SQL += ' from   tbl_pessoa';
      SQL += lFiltro; //where
      SQL += ' order by cod_pessoa desc';

  db.query(SQL, (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

/* tbl_pessoa - Paciente*/
app.get("/paciente/listar", (req, res) => {
  let lFiltro = ' where flg_paciente = "S"';

  let SQL  = ' select *';
      SQL += ' from   tbl_pessoa';
      SQL += lFiltro; //where
      SQL += ' order by cod_pessoa desc';

  db.query(SQL, (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

/* tbl_pessoa*/
app.get("/pessoa/listar/:cod_pessoa", (req, res) => {
  let SQL  = ' select *';
      SQL += ' from   tbl_pessoa';
      SQL += ' where  cod_pessoa = ?';

  db.query(SQL, [req.params.cod_pessoa], (err, result) => {
    if (err){
      return res.status(500).send(err);
    } else{
      res.send(result);
    }
  });
});

app.post("/pessoa/inserir", (req, res) => {
  const body = req.body;

  let SQL  = ' insert into tbl_pessoa (dsc_nome_pessoa, dsc_nome_fantasia, dsc_referencia, dsc_rg_insc_estadual, dsc_cpf_cnpj, dsc_ddd_01, dsc_fone_01, dsc_ddd_celular_01,';
      SQL +=                         ' dsc_celular_01, dsc_cep, dsc_bairro, dsc_cidade, dsc_logradouro, dat_cadastro, dat_nascimento, flg_usuario,';
      SQL +=                         ' flg_paciente, flg_colaborador, flg_fornecedor, flg_sexo, flg_uf, num_logradouro, dsc_imagem)';
      SQL += ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(SQL, [body.dsc_nome_pessoa, body.dsc_nome_fantasia, body.dsc_referencia, body.dsc_rg_insc_estadual, body.dsc_cpf_cnpj, body.dsc_ddd_01, body.dsc_fone_01,
                 body.dsc_ddd_celular_01, body.dsc_celular_01, body.dsc_cep, body.dsc_bairro, body.dsc_cidade, body.dsc_logradouro, body.dat_cadastro,
                 body.dat_nascimento, body.flg_usuario, body.flg_paciente, body.flg_colaborador, body.flg_fornecedor, body.flg_sexo, body.flg_uf,
                 body.num_logradouro, body.dsc_imagem], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

app.put("/pessoa/editar/:cod_pessoa", (req, res) => {
  const body = req.body;

  let SQL  = ' update tbl_pessoa';
      SQL += ' set dsc_nome_pessoa      = ?,';
      SQL +=     ' dsc_nome_fantasia    = ?,';
      SQL +=     ' dsc_referencia       = ?,';
      SQL +=     ' dsc_rg_insc_estadual = ?,';
      SQL +=     ' dsc_cpf_cnpj         = ?,';
      SQL +=     ' dsc_ddd_01           = ?,';
      SQL +=     ' dsc_fone_01          = ?,';
      SQL +=     ' dsc_ddd_celular_01   = ?,';
      SQL +=     ' dsc_celular_01       = ?,';
      SQL +=     ' dsc_cep              = ?,';
      SQL +=     ' dsc_bairro           = ?,';
      SQL +=     ' dsc_cidade           = ?,';
      SQL +=     ' dsc_logradouro       = ?,';
      SQL +=     ' dat_cadastro         = ?,';
      SQL +=     ' dat_nascimento       = ?,';
      SQL +=     ' flg_usuario          = ?,';
      SQL +=     ' flg_paciente         = ?,';
      SQL +=     ' flg_colaborador      = ?,';
      SQL +=     ' flg_fornecedor       = ?,';
      SQL +=     ' flg_uf               = ?,';
      SQL +=     ' num_logradouro       = ?';
      SQL += ' where cod_pessoa         = ?';

  db.query(SQL, [body.dsc_nome_pessoa, body.dsc_nome_fantasia, body.dsc_referencia, body.dsc_rg_insc_estadual, body.dsc_cpf_cnpj, body.dsc_ddd_01,
                 body.dsc_fone_01, body.dsc_ddd_celular_01, body.dsc_celular_01, body.dsc_cep, body.dsc_bairro, body.dsc_cidade, body.dsc_logradouro,
                 body.dat_cadastro, body.dat_nascimento, body.flg_usuario, body.flg_paciente, body.flg_colaborador, body.flg_fornecedor, body.flg_uf,
                 body.num_logradouro, req.params.cod_pessoa], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

app.delete("/pessoa/excluir/:cod_pessoa", (req, res) => {
  let SQL  = ' delete from tbl_pessoa';
      SQL += ' where cod_pessoa = ?';

  db.query(SQL, [req.params.cod_pessoa], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

//Upload Imagem
app.post("/upload-image", uploaduser.single('image'), async(req, res) => {
  if (req.file) {
    return res.json({
      erro: false,
      mensagem: "Upload realizado com sucesso!"
    });  
  }
  
  return res.status(400).json({
    erro: true,
    mensagem: "Erro: Upload não realizado, aceito tipos PNG, JPG, JPEG ou BMP!"
  });
});

app.listen(3002, ()=>{
  console.log('Servidor Web no ar na porta 3001');
});

https.createServer({
  cert: fs.readFileSync('ssl/code.crt'),
  key:  fs.readFileSync('ssl/code.key')
}, app).listen(3001, () => console.log("Servidor Web Https no ar na porta 3002"));