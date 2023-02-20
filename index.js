import express from "express";
import mysql   from "mysql";
import cors    from "cors";
import fs      from "fs";
import https   from "https";

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

//****** Pessoa ******

//tbl_pessoa - Todos
app.get("/pessoa/listar", (req, res) => {
  let lFiltro = ' where 1 = 1';

  let SQL  = ' select *';
      SQL += ' from   tbl_pessoa';
      SQL += lFiltro; //where
      SQL += ' order by cod_pessoa desc';

  db.query(SQL, (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

//tbl_pessoa - Paciente
app.get("/paciente/listar", (req, res) => {
  let lFiltro = ' where flg_tipo_cadastro = "P"';

  let SQL  = ' select *';
      SQL += ' from   tbl_pessoa';
      SQL += lFiltro; //where
      SQL += ' order by cod_pessoa desc';

  db.query(SQL, (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

//tbl_pessoa - Colaborador*/
app.get("/colaborador/listar", (req, res) => {
  let lFiltro = ' where flg_tipo_cadastro = "C"';

  let SQL  = ' select *';
      SQL += ' from   tbl_pessoa';
      SQL += lFiltro; //where
      SQL += ' order by cod_pessoa desc';

  db.query(SQL, (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

//tbl_pessoa - Fornecedor
app.get("/fornecedor/listar", (req, res) => {
  let lFiltro = ' where flg_tipo_cadastro = "F"';

  let SQL  = ' select *';
      SQL += ' from   tbl_pessoa';
      SQL += lFiltro; //where
      SQL += ' order by cod_pessoa desc';

  db.query(SQL, (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

//tbl_pessoa - Contato
app.get("/contato/listar", (req, res) => {
  let lFiltro = ' where flg_tipo_cadastro = "N"';

  let SQL  = ' select *';
      SQL += ' from   tbl_pessoa';
      SQL += lFiltro; //where
      SQL += ' order by cod_pessoa desc';

  db.query(SQL, (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

//tbl_pessoa - Listar - Dados da Pessoa - 1 Registro
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

//tbl_pessoa - Inserir
app.post("/pessoa/inserir", (req, res) => {
  const body = req.body;

  let SQL  = ' insert into tbl_pessoa (dsc_nome_pessoa, dsc_nome_fantasia, dsc_referencia, dsc_rg_insc_estadual, dsc_cpf_cnpj, dsc_ddd_01, dsc_fone_01,';
      SQL +=                         ' dsc_ddd_celular_01, dsc_celular_01, dsc_cep, dsc_bairro, dsc_cidade, dsc_logradouro, dat_cadastro, dat_nascimento,';
      SQL +=                         ' flg_tipo_cadastro, flg_usuario, flg_tipo_pessoa, flg_sexo, flg_uf, num_logradouro, dsc_imagem)';
      SQL += ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(SQL, [body.dsc_nome_pessoa, body.dsc_nome_fantasia, body.dsc_referencia, body.dsc_rg_insc_estadual, body.dsc_cpf_cnpj, body.dsc_ddd_01,
                 body.dsc_fone_01, body.dsc_ddd_celular_01, body.dsc_celular_01, body.dsc_cep, body.dsc_bairro, body.dsc_cidade, body.dsc_logradouro,
                 body.dat_cadastro, body.dat_nascimento, body.flg_tipo_cadastro, body.flg_usuario, body.flg_tipo_pessoa, body.flg_sexo, body.flg_uf,
                 body.num_logradouro, body.dsc_imagem], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

//tbl_pessoa - Editar
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
      SQL +=     ' dsc_cidade_natal     = ?,';
      SQL +=     ' dsc_logradouro       = ?,';
      SQL +=     ' dat_cadastro         = ?,';
      SQL +=     ' dat_nascimento       = ?,';
      SQL +=     ' flg_tipo_cadastro    = ?,';
      SQL +=     ' flg_usuario          = ?,';      
      SQL +=     ' flg_uf               = ?,';
      SQL +=     ' flg_tipo_pessoa      = ?,';
      SQL +=     ' flg_sexo             = ?,';
      SQL +=     ' num_logradouro       = ?';
      SQL += ' where cod_pessoa         = ?';

  db.query(SQL, [body.dsc_nome_pessoa, body.dsc_nome_fantasia, body.dsc_referencia, body.dsc_rg_insc_estadual, body.dsc_cpf_cnpj, body.dsc_ddd_01, body.dsc_fone_01, body.dsc_ddd_celular_01,
                 body.dsc_celular_01, body.dsc_cep, body.dsc_bairro, body.dsc_cidade, body.dsc_cidade_natal, body.dsc_logradouro, body.dat_cadastro, body.dat_nascimento, body.flg_tipo_cadastro,
                 body.flg_usuario, body.flg_uf, body.flg_tipo_pessoa, body.flg_sexo, body.num_logradouro, req.params.cod_pessoa], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

//tbl_pessoa - Excluir
app.delete("/pessoa/excluir/:cod_pessoa", (req, res) => {
  let SQL  = ' delete from tbl_pessoa';
      SQL += ' where cod_pessoa = ?';

  db.query(SQL, [req.params.cod_pessoa], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

//****** Pessoa Contatos ******/

//tbl_pessoa_contato - Listar por pessoa
app.get("/pessoa/contato/listar/:cod_pessoa", (req, res) => {
  let SQL  = ' select tbl_pessoa_contato.fky_contato,';
      SQL += '        tbl_pessoa_contato.flg_tipo_contato,';
      SQL += '        tbl_pessoa_contato.flg_contato_principal,';
      SQL += '        tbl_pessoa_contato.fky_pessoa,';
      SQL += '        contato.dsc_nome_pessoa dsc_nome_contato,';
      SQL += '        contato.dsc_ddd_01,';
      SQL += '        contato.dsc_fone_01,';
      SQL += '        contato.dsc_ddd_celular_01,';
      SQL += '        contato.dsc_celular_01';
      SQL += ' from   tbl_pessoa_contato';
      SQL += ' inner join tbl_pessoa contato on (tbl_pessoa_contato.fky_contato = contato.cod_pessoa)';      
      SQL += ' where tbl_pessoa_contato.fky_pessoa = ?';

  db.query(SQL, [req.params.cod_pessoa], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

/*tbl_pessoa_contato - Inserir*/
app.post("/pessoa/contato/inserir", (req, res) => {
  const body = req.body;

  let SQL  = ' insert into tbl_pessoa_contato (fky_pessoa, fky_contato, dsc_profissao, dsc_local_trabalho, dsc_ddd_fone_trabalho, dsc_fone_trabalho, flg_tipo_contato, ';
      SQL +=                          ' flg_contato_principal, flg_estado_civil)';
      SQL += ' values (?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(SQL, [body.fky_pessoa, body.fky_contato, body.dsc_profissao, body.dsc_local_trabalho, body.dsc_ddd_fone_trabalho, body.dsc_fone_trabalho, body.flg_tipo_contato,
                 body.flg_contato_principal, body.flg_estado_civil], (err, result) =>{
    if (err) console.log(err)
    else res.send(result.insertid);
  });
});


//tbl_pessoa_contato - Excluir
app.delete("/pessoa/contato/excluir/:fky_pessoa/:fky_contato", (req, res) => {
  let SQL  = ' delete from tbl_pessoa_contato';
      SQL += ' where fky_pessoa  = ?';
      SQL += '   and fky_contato = ?'

  db.query(SQL, [req.params.fky_pessoa, req.params.fky_contato], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

/****** Paciente ******/

//tbl_paciente - Listar - Dados do Paciente - 1 Registro
app.get("/pessoa/paciente/listar/:cod_pessoa", (req, res) => {
  let SQL  = ' select *';
      SQL += ' from   tbl_paciente';
      SQL += ' where  fky_pessoa = ?';

  db.query(SQL, [req.params.cod_pessoa], (err, result) => {
    if (err){
      return res.status(500).send(err);
    } else{
      res.send(result);
    }
  });
});

/*tbl_paciente - Inserir*/
app.post("pessoa/paciente/inserir", (req, res) => {
  const body = req.body;

  let SQL  = ' insert into tbl_pessoa_contato (flg_estado_civil, flg_frequenta_religiao, dsc_cidade_ant, flg_possui_filho, int_quant_filho, int_quant_filho_vivo, flg_possui_casa_propria,';
      SQL +=                                 ' dsc_filiacao_mae, dsc_filiacao_pai, flg_possui_renda, dsc_tipo_renda, dbl_valor_renda, flg_paciente_interditado, mem_dados_resguardado)';
      SQL += ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(SQL, [body.flg_estado_civil, body.flg_frequenta_religiao, body.dsc_cidade_ant, body.flg_possui_filho, body.int_quant_filho, body.int_quant_filho_vivo,
                 body.flg_possui_casa_propria, body.dsc_filiacao_mae, body.dsc_filiacao_pai, body.flg_possui_renda, body.dsc_tipo_renda, body.dbl_valor_renda, body.flg_paciente_interditado,
                 body.mem_dados_resguardado], (err, result) =>{
    if (err) console.log(err)
    else res.send(result.insertid);
  });
});

//tbl_pessoa - Editar e Inserir quando não encontrado
app.put("/pessoa/paciente/editar/:cod_pessoa", (req, res) => {
  const body = req.body;

  let SQL  = ' update tbl_paciente';
      SQL += ' set fky_pessoa               = ?,';;
      SQL +=     ' dsc_filiacao_pai         = ?,';
      SQL +=     ' dsc_filiacao_mae         = ?,';
      SQL +=     ' dsc_religiao             = ?,';
      SQL +=     ' dsc_tipo_renda           = ?,';
      SQL +=     ' dsc_cidade_ant           = ?,';
      SQL +=     ' dat_residencia_cidade    = ?,';
      SQL +=     ' dbl_valor_renda          = ?,';
      SQL +=     ' fky_curador              = ?,';
      SQL +=     ' flg_estado_civil         = ?,';
      SQL +=     ' flg_frequenta_religiao   = ?,';      
      SQL +=     ' flg_possui_filho         = ?,';
      SQL +=     ' flg_possui_casa_propria  = ?,';
      SQL +=     ' flg_possui_renda         = ?,';
      SQL +=     ' flg_paciente_interditado = ?,';
      SQL +=     ' int_quant_filho          = ?,';
      SQL +=     ' int_quant_filho_vivo     = ?,';
      SQL +=     ' mem_dados_resguardado    = ?';
      SQL += ' where fky_pessoa             = ?';

  db.query(SQL, [body.fky_pessoa, body.dsc_filiacao_pai, body.dsc_filiacao_mae, body.dsc_religiao, body.dsc_tipo_renda, body.dsc_cidade_ant, body.dat_residencia_cidade, body.dbl_valor_renda,
                 body.fky_curador, body.flg_estado_civil, body.flg_frequenta_religiao, body.flg_possui_filho, body.flg_possui_casa_propria, body.flg_possui_renda, body.flg_paciente_interditado,
                 body.int_quant_filho, body.int_quant_filho_vivo, body.mem_dados_resguardado, req.params.cod_pessoa], (err, result) =>{
    if (err) console.log(err)
    else{

    //Se não encontrou - Insere  
      if (result.affectedRows === 0) {
        SQL  = ' insert into tbl_paciente (fky_pessoa, dsc_filiacao_pai, dsc_filiacao_mae, dsc_religiao, dsc_tipo_renda, dsc_cidade_ant, dat_residencia_cidade, dbl_valor_renda, fky_curador,';
        SQL +=                           ' flg_estado_civil, flg_frequenta_religiao, flg_possui_filho, flg_possui_casa_propria, flg_possui_renda, flg_paciente_interditado, int_quant_filho,';
        SQL +=                           ' int_quant_filho_vivo, mem_dados_resguardado)';
        SQL += ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        db.query(SQL, [body.fky_pessoa, body.dsc_filiacao_pai, body.dsc_filiacao_mae, body.dsc_religiao, body.dsc_tipo_renda, body.dsc_cidade_ant, body.dat_residencia_cidade, body.dbl_valor_renda,
                       null, body.flg_estado_civil, body.flg_frequenta_religiao, body.flg_possui_filho, body.flg_possui_casa_propria, body.flg_possui_renda, body.flg_paciente_interditado,
                       body.int_quant_filho, body.int_quant_filho_vivo, body.mem_dados_resguardado, req.params.cod_pessoa], (err, result) =>{
          if (err) console.log(err)
          else res.send(result.insertid);
        });

        res.send(result);
      }
      else{
        res.send(result);
      }
    } 
  });
});

app.get("/", (req, res) => {
  res.send("<h1>My Node App</h1>")
});

app.listen(5000, ()=>{
  console.log('Servidor Web no ar na porta 5000');
});

//https.createServer({
  //cert: fs.readFileSync('ssl/code.crt'),
  //key:  fs.readFileSync('ssl/code.key')
//}, app).listen(3001, () => console.log("Servidor Web Https no ar na porta 3001"));