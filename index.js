import express    from "express";
import mysql      from "mysql";
import cors       from "cors";
import headers    from "./next.config.js";

const app = express();
app.use(cors());

const db = mysql.createPool({
  host: "suitesistemas.cbtdu4gfiiub.us-east-1.rds.amazonaws.com",
  user: 'suite', //'root',
  password: '235901ss', //'masterkey',
  database: 'dados_ports_saude'
});

headers();

{/*app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin",  "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization, cod_conta");
  //req.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization, cod_conta");

  next();
});*/}

app.use((req, res, next) => {
  req.header("Access-Control-Allow-Credentials", "true"); 
  req.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  req.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization, cod_conta");

  res.header("Access-Control-Allow-Credentials", "true"); 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization, cod_conta");
  //req.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization, cod_conta");

  next();
})

app.use(express.static('public/upload')); //Libera acesso a pasta de imagens*/

app.use(express.json());

//****** tbl_conta ******/
//tbl_conta - Login - busca codigo da conta
app.get("/pessoa/conta/login/:dsc_conta", (req, res) => {
  let SQL  = ' select cod_conta';
      SQL += ' from   tbl_conta';
      SQL += ' where  dsc_conta = ?';

  db.query(SQL, [req.params.dsc_conta], (err, result) => {
    if (err){
      return res.status(500).send(err);
    } else{
      res.send(result);
    }
  });
});

//****** tbl_pessoa ******

//tbl_pessoa - Todos
app.get("/pessoa/listar", (req, res) => {
  let lFiltro = ' where fky_conta = ?';

  let SQL  = ' select *';
      SQL += ' from   tbl_pessoa';
      SQL += lFiltro; //where
      SQL += ' order by cod_pessoa desc';

  db.query(SQL, [req.headers.cod_conta], (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

//tbl_pessoa - Paciente
app.get("/paciente/listar", (req, res) => {
  let lFiltro = ' where fky_conta         = ?';
      lFiltro += '  and flg_tipo_cadastro = "P"';

  let SQL  = ' select *';
      SQL += ' from   tbl_pessoa';
      SQL += lFiltro; //where
      SQL += ' order by cod_pessoa desc';

  db.query(SQL, [req.headers.cod_conta], (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

//tbl_pessoa - Colaborador*/
app.get("/colaborador/listar", (req, res) => {
  let lFiltro  = ' where fky_conta         = ?';
      lFiltro += '   and flg_tipo_cadastro = "C"';

  let SQL  = ' select *';
      SQL += ' from   tbl_pessoa';
      SQL += lFiltro; //where
      SQL += ' order by cod_pessoa desc';

  db.query(SQL, [req.headers.cod_conta], (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

//tbl_pessoa - Fornecedor
app.get("/fornecedor/listar", (req, res) => {
  let lFiltro =  ' where fky_conta         = ?';
      lFiltro += '   and flg_tipo_cadastro = "F"';

  let SQL  = ' select *';
      SQL += ' from   tbl_pessoa';
      SQL += lFiltro; //where
      SQL += ' order by cod_pessoa desc';

  db.query(SQL, [req.headers.cod_conta], (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

//tbl_pessoa - Contato
app.get("/contato/listar", (req, res) => {
  let lFiltro =  ' where fky_conta         = ?';
      lFiltro += '   and flg_tipo_cadastro = "N"';

  let SQL  = ' select *';
      SQL += ' from   tbl_pessoa';
      SQL += lFiltro; //where
      SQL += ' order by cod_pessoa desc';

  db.query(SQL, [req.headers.cod_conta], (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

//tbl_pessoa - Listar - Dados da Pessoa - 1 Registro
app.get("/pessoa/listar/:cod_pessoa", (req, res) => {
  let SQL  = ' select *';
      SQL += ' from   tbl_pessoa';
      SQL += ' where  fky_conta  = ?';
      SQL += '   and  cod_pessoa = ?';

  db.query(SQL, [req.headers.cod_conta, req.params.cod_pessoa], (err, result) => {
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

  let SQL  = ' insert into tbl_pessoa (fky_conta, dsc_nome_pessoa, dsc_nome_fantasia, dsc_referencia, dsc_rg_insc_estadual, dsc_cpf_cnpj, dsc_ddd_01, dsc_fone_01,';
      SQL +=                         ' dsc_ddd_celular_01, dsc_celular_01, dsc_cep, dsc_bairro, dsc_cidade, dsc_cidade_natal, dsc_logradouro, dat_cadastro, dat_nascimento,';
      SQL +=                         ' flg_tipo_cadastro, flg_usuario, flg_tipo_pessoa, flg_sexo, flg_uf, num_logradouro, dsc_imagem)';
      SQL += ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(SQL, [req.headers.cod_conta, body.dsc_nome_pessoa, body.dsc_nome_fantasia, body.dsc_referencia, body.dsc_rg_insc_estadual, body.dsc_cpf_cnpj, body.dsc_ddd_01,
                 body.dsc_fone_01, body.dsc_ddd_celular_01, body.dsc_celular_01, body.dsc_cep, body.dsc_bairro, body.dsc_cidade, body.dsc_cidade_natal, body.dsc_logradouro,
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
      SQL += ' where fky_conta          = ?';
      SQL += '   and cod_pessoa         = ?';

  db.query(SQL, [body.dsc_nome_pessoa, body.dsc_nome_fantasia, body.dsc_referencia, body.dsc_rg_insc_estadual, body.dsc_cpf_cnpj, body.dsc_ddd_01, body.dsc_fone_01, body.dsc_ddd_celular_01,
                 body.dsc_celular_01, body.dsc_cep, body.dsc_bairro, body.dsc_cidade, body.dsc_cidade_natal, body.dsc_logradouro, body.dat_cadastro, body.dat_nascimento, body.flg_tipo_cadastro,
                 body.flg_usuario, body.flg_uf, body.flg_tipo_pessoa, body.flg_sexo, body.num_logradouro, req.headers.cod_conta, req.params.cod_pessoa], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

//tbl_pessoa - Excluir
app.delete("/pessoa/excluir/:cod_pessoa", (req, res) => {
  let SQL  = ' delete from tbl_pessoa';
      SQL += ' where fky_conta  = ?';
      SQL += '   and cod_pessoa = ?';

  db.query(SQL, [req.headers.cod_conta, req.params.cod_pessoa], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

/****** Usuario ******/

//tbl_usuario - Listar - Dados do Usuario - 1 Registro
app.get("/pessoa/usuario/listar/:cod_pessoa", (req, res) => {
  let SQL  = ' select *';
      SQL += ' from   tbl_usuario';
      SQL += ' where  fky_conta  = ?';
      SQL += '   and  fky_pessoa = ?';

  db.query(SQL, [req.headers.cod_conta, req.params.cod_pessoa], (err, result) => {
    if (err){
      return res.status(500).send(err);
    } else{
      res.send(result);
    }
  });
});

//tbl_usuario - Login - Dados do Usuario
app.get("/pessoa/usuario/login/:dsc_usuario/:dsc_senha", (req, res) => {
  let cod_conta = req.headers.cod_conta;

  let SQL  = ' select flg_visualizar_resguardado';
      SQL += ' from   tbl_usuario';
      SQL += ' where  fky_conta   = ?';
      SQL += '   and  dsc_usuario = ?';
      SQL +=   ' and  dsc_senha   = ?';

      console.log(cod_conta);
      console.log(req.params.dsc_usuario);
      console.log(req.params.dsc_senha);
    
    if (cod_conta == 'undefined'){
      cod_conta = 1; 
    }

    console.log(cod_conta);
    console.log(req.params.dsc_usuario);
    console.log(req.params.dsc_senha);

  db.query(SQL, [cod_conta, req.params.dsc_usuario, req.params.dsc_senha], (err, result) => {
    if (err){
      return res.status(500).send(err);
    } else{
      res.send(result);
    }
  });
});

//tbl_usuario - Editar e Inserir quando não encontrado
app.put("/pessoa/usuario/editar/:cod_pessoa", (req, res) => {
  const body = req.body;

  let SQL  = ' update tbl_usuario';
      SQL += ' set dsc_usuario                = ?,';
      SQL +=     ' dsc_senha                  = ?,';
      SQL +=     ' flg_visualizar_resguardado = ?';      
      SQL += ' where fky_conta  = ?';
      SQL += '   and fky_pessoa = ?';

  db.query(SQL, [body.dsc_usuario, body.dsc_senha, body.flg_visualizar_resguardado, req.headers.cod_conta, req.params.cod_pessoa], (err, result) =>{
    if (err) console.log(err)
    else{

    //Se não encontrou - Insere  
      if (result.affectedRows === 0) {
        SQL  = ' insert into tbl_usuario (fky_pessoa, dsc_usuario, dsc_senha, flg_visualizar_resguardado)';
        SQL += ' values (?, ?, ?, ?)';

        db.query(SQL, [body.fky_pessoa, body.dsc_usuario, body.dsc_senha, body.flg_visualizar_resguardado], (err, result) =>{
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
      SQL += ' where tbl_pessoa_contato.fky_conta  = ?';
      SQL += '   and tbl_pessoa_contato.fky_pessoa = ?';

  db.query(SQL, [req.headers.cod_conta, req.params.cod_pessoa], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

/*tbl_pessoa_contato - Inserir*/
app.post("/pessoa/contato/inserir", (req, res) => {
  const body = req.body;

  let SQL  = ' insert into tbl_pessoa_contato (fky_conta, fky_pessoa, fky_contato, dsc_profissao, dsc_local_trabalho, dsc_ddd_fone_trabalho, dsc_fone_trabalho, flg_tipo_contato, ';
      SQL +=                          ' flg_contato_principal, flg_estado_civil)';
      SQL += ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(SQL, [req.headers.cod_conta, body.fky_pessoa, body.fky_contato, body.dsc_profissao, body.dsc_local_trabalho, body.dsc_ddd_fone_trabalho, body.dsc_fone_trabalho, body.flg_tipo_contato,
                 body.flg_contato_principal, body.flg_estado_civil], (err, result) =>{
    if (err) console.log(err)
    else res.send(result.insertid);
  });
});

//tbl_pessoa_contato - Excluir
app.delete("/pessoa/contato/excluir/:fky_pessoa/:fky_contato", (req, res) => {
  let SQL  = ' delete from tbl_pessoa_contato';
      SQL += ' where fky_conta   = ?';
      SQL += '   and fky_pessoa  = ?';
      SQL += '   and fky_contato = ?'

  db.query(SQL, [req.headers.cod_conta, req.params.fky_pessoa, req.params.fky_contato], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

/****** Paciente ******/

//tbl_paciente - Listar - Dados do Paciente - 1 Registro
app.get("/pessoa/paciente/listar/:cod_pessoa", (req, res) => {
  let SQL  = ' select *';
      SQL += ' from   tbl_paciente';
      SQL += ' where  fky_conta  = ?';
      SQL += '   and  fky_pessoa = ?';

  db.query(SQL, [req.headers.cod_conta, req.params.cod_pessoa], (err, result) => {
    if (err){
      return res.status(500).send(err);
    } else{
      res.send(result);
    }
  });
});

//tbl_paciente - Editar e Inserir quando não encontrado
app.put("/pessoa/paciente/editar/:cod_pessoa", (req, res) => {
  const body = req.body;

  let SQL  = ' update tbl_paciente';
      SQL += ' set dsc_filiacao_pai         = ?,';
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
      SQL += ' where fky_conta              = ?';
      SQL += '   and fky_pessoa             = ?';

  db.query(SQL, [body.dsc_filiacao_pai, body.dsc_filiacao_mae, body.dsc_religiao, body.dsc_tipo_renda, body.dsc_cidade_ant, body.dat_residencia_cidade, body.dbl_valor_renda,
                 body.fky_curador, body.flg_estado_civil, body.flg_frequenta_religiao, body.flg_possui_filho, body.flg_possui_casa_propria, body.flg_possui_renda, body.flg_paciente_interditado,
                 body.int_quant_filho, body.int_quant_filho_vivo, body.mem_dados_resguardado, req.headers.cod_conta, req.params.cod_pessoa], (err, result) =>{
    if (err) console.log(err)
    else{

    //Se não encontrou - Insere  
      if (result.affectedRows === 0) {
        SQL  = ' insert into tbl_paciente (fky_conta, fky_pessoa, dsc_filiacao_pai, dsc_filiacao_mae, dsc_religiao, dsc_tipo_renda, dsc_cidade_ant, dat_residencia_cidade, dbl_valor_renda, fky_curador,';
        SQL +=                           ' flg_estado_civil, flg_frequenta_religiao, flg_possui_filho, flg_possui_casa_propria, flg_possui_renda, flg_paciente_interditado, int_quant_filho,';
        SQL +=                           ' int_quant_filho_vivo, mem_dados_resguardado)';
        SQL += ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        db.query(SQL, [req.headers.cod_conta, body.fky_pessoa, body.dsc_filiacao_pai, body.dsc_filiacao_mae, body.dsc_religiao, body.dsc_tipo_renda, body.dsc_cidade_ant, body.dat_residencia_cidade, body.dbl_valor_renda,
                       null, body.flg_estado_civil, body.flg_frequenta_religiao, body.flg_possui_filho, body.flg_possui_casa_propria, body.flg_possui_renda, body.flg_paciente_interditado,
                       body.int_quant_filho, body.int_quant_filho_vivo, body.mem_dados_resguardado], (err, result) =>{
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

/****** ******/

app.get("/", (req, res) => {
  res.send("<h1>Servidor Web no ar na porta 5000</h1>")
});

app.listen(5000, ()=>{
  console.log('Servidor Web no ar na porta 5000 016');
});