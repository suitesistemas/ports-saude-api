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
app.get("/pessoa/listar/:cod_conta", (req, res) => {
  let lFiltro = ' where fky_conta = ?';

  let SQL  = ' select *';
      SQL += ' from   tbl_pessoa';
      SQL += lFiltro; //where
      SQL += ' order by cod_pessoa desc';

  db.query(SQL, [req.params.cod_conta], (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

//tbl_pessoa - Paciente
app.get("/paciente/listar/:cod_conta", (req, res) => {
  let lFiltro = ' where fky_conta         = ?';
      lFiltro += '  and flg_tipo_cadastro = "P"';

  let SQL  = ' select *';
      SQL += ' from   tbl_pessoa';
      SQL += lFiltro; //where
      SQL += ' order by cod_pessoa desc';

  db.query(SQL, [req.params.cod_conta], (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

//tbl_pessoa - Colaborador*/
app.get("/colaborador/listar/:cod_conta", (req, res) => {
  let lFiltro  = ' where fky_conta         = ?';
      lFiltro += '   and flg_tipo_cadastro = "C"';

  let SQL  = ' select *';
      SQL += ' from   tbl_pessoa';
      SQL += lFiltro; //where
      SQL += ' order by cod_pessoa desc';

  db.query(SQL, [req.params.cod_conta], (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

//tbl_pessoa - Fornecedor
app.get("/fornecedor/listar/:cod_conta", (req, res) => {
  let lFiltro =  ' where fky_conta         = ?';
      lFiltro += '   and flg_tipo_cadastro = "F"';

  let SQL  = ' select *';
      SQL += ' from   tbl_pessoa';
      SQL += lFiltro; //where
      SQL += ' order by cod_pessoa desc';

  db.query(SQL, [req.params.cod_conta], (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

//tbl_pessoa - Contato
app.get("/contato/listar/:cod_conta", (req, res) => {
  let lFiltro =  ' where fky_conta         = ?';
      lFiltro += '   and flg_tipo_cadastro = "N"';

  let SQL  = ' select *';
      SQL += ' from   tbl_pessoa';
      SQL += lFiltro; //where
      SQL += ' order by cod_pessoa desc';

  db.query(SQL, [req.params.cod_conta], (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

//tbl_pessoa - Listar - Dados da Pessoa - 1 Registro
app.get("/pessoa/listar/:cod_conta/:cod_pessoa", (req, res) => {
  let SQL  = ' select *';
      SQL += ' from   tbl_pessoa';
      SQL += ' where  fky_conta  = ?';
      SQL += '   and  cod_pessoa = ?';

  db.query(SQL, [req.params.cod_conta, req.params.cod_pessoa], (err, result) => {
    if (err){
      return res.status(500).send(err);
    } else{
      res.send(result);
    }
  });
});

//tbl_pessoa - Inserir
app.post("/pessoa/inserir/:cod_conta", (req, res) => {
  const body = req.body;

  let SQL  = ' insert into tbl_pessoa (fky_conta, dsc_nome_pessoa, dsc_nome_fantasia, dsc_referencia, dsc_rg_insc_estadual, dsc_cpf_cnpj, dsc_ddd_01, dsc_fone_01,';
      SQL +=                         ' dsc_ddd_celular_01, dsc_celular_01, dsc_cep, dsc_bairro, dsc_cidade, dsc_cidade_natal, dsc_logradouro, dat_cadastro, dat_nascimento,';
      SQL +=                         ' flg_tipo_cadastro, flg_usuario, flg_tipo_pessoa, flg_sexo, flg_uf, num_logradouro, dsc_imagem)';
      SQL += ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(SQL, [req.params.cod_conta, body.dsc_nome_pessoa, body.dsc_nome_fantasia, body.dsc_referencia, body.dsc_rg_insc_estadual, body.dsc_cpf_cnpj, body.dsc_ddd_01,
                 body.dsc_fone_01, body.dsc_ddd_celular_01, body.dsc_celular_01, body.dsc_cep, body.dsc_bairro, body.dsc_cidade, body.dsc_cidade_natal, body.dsc_logradouro,
                 body.dat_cadastro, body.dat_nascimento, body.flg_tipo_cadastro, body.flg_usuario, body.flg_tipo_pessoa, body.flg_sexo, body.flg_uf,
                 body.num_logradouro, body.dsc_imagem], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

//tbl_pessoa - Editar
app.put("/pessoa/editar/:cod_conta/:cod_pessoa", (req, res) => {
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
                 body.flg_usuario, body.flg_uf, body.flg_tipo_pessoa, body.flg_sexo, body.num_logradouro, req.params.cod_conta, req.params.cod_pessoa], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

//tbl_pessoa - Excluir
app.delete("/pessoa/excluir/:cod_conta/:cod_pessoa", (req, res) => {
  let SQL  = ' delete from tbl_pessoa';
      SQL += ' where fky_conta  = ?';
      SQL += '   and cod_pessoa = ?';

  db.query(SQL, [req.params.cod_conta, req.params.cod_pessoa], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

/****** Usuario ******/

//tbl_usuario - Listar - Dados do Usuario - 1 Registro
app.get("/pessoa/usuario/listar/:cod_conta/:cod_pessoa", (req, res) => {
  let SQL  = ' select *';
      SQL += ' from   tbl_usuario';
      SQL += ' where  fky_conta  = ?';
      SQL += '   and  fky_pessoa = ?';

  db.query(SQL, [req.params.cod_conta, req.params.cod_pessoa], (err, result) => {
    if (err){
      return res.status(500).send(err);
    } else{
      res.send(result);
    }
  });
});

//tbl_usuario - Login - Dados do Usuario
app.get("/pessoa/usuario/login/:cod_conta/:dsc_usuario/:dsc_senha", (req, res) => {
  let SQL  = ' select flg_visualizar_resguardado';
      SQL += ' from   tbl_usuario';
      SQL += ' where  fky_conta   = ?';
      SQL += '   and  dsc_usuario = ?';
      SQL +=   ' and  dsc_senha   = ?';

  db.query(SQL, [req.params.cod_conta, req.params.dsc_usuario, req.params.dsc_senha], (err, result) => {
    if (err){
      return res.status(500).send(err);
    } else{
      res.send(result);
    }
  });
});

//tbl_usuario - Editar e Inserir quando não encontrado
app.put("/pessoa/usuario/editar/:cod_conta/:cod_pessoa", (req, res) => {
  const body = req.body;

  let SQL  = ' update tbl_usuario';
      SQL += ' set dsc_usuario                = ?,';
      SQL +=     ' dsc_senha                  = ?,';
      SQL +=     ' flg_visualizar_resguardado = ?';      
      SQL += ' where fky_conta  = ?';
      SQL += '   and fky_pessoa = ?';

  db.query(SQL, [body.dsc_usuario, body.dsc_senha, body.flg_visualizar_resguardado, req.params.cod_conta, req.params.cod_pessoa], (err, result) =>{
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
app.get("/pessoa/contato/listar/:cod_conta/:cod_pessoa", (req, res) => {
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

  db.query(SQL, [req.params.cod_conta, req.params.cod_pessoa], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

/*tbl_pessoa_contato - Inserir*/
app.post("/pessoa/contato/inserir/:cod_conta", (req, res) => {
  const body = req.body;

  let SQL  = ' insert into tbl_pessoa_contato (fky_conta, fky_pessoa, fky_contato, dsc_profissao, dsc_local_trabalho, dsc_ddd_fone_trabalho, dsc_fone_trabalho, flg_tipo_contato, ';
      SQL +=                          ' flg_contato_principal, flg_estado_civil)';
      SQL += ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(SQL, [req.params.cod_conta, body.fky_pessoa, body.fky_contato, body.dsc_profissao, body.dsc_local_trabalho, body.dsc_ddd_fone_trabalho, body.dsc_fone_trabalho, body.flg_tipo_contato,
                 body.flg_contato_principal, body.flg_estado_civil], (err, result) =>{
    if (err) console.log(err)
    else res.send(result.insertid);
  });
});

//tbl_pessoa_contato - Excluir
app.delete("/pessoa/contato/excluir/:cod_conta/:fky_pessoa/:fky_contato", (req, res) => {
  let SQL  = ' delete from tbl_pessoa_contato';
      SQL += ' where fky_conta   = ?';
      SQL += '   and fky_pessoa  = ?';
      SQL += '   and fky_contato = ?'

  db.query(SQL, [req.params.cod_conta, req.params.fky_pessoa, req.params.fky_contato], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

//****** Pessoa Tratamento ******/

//tbl_paciente_tratamento - Listar por pessoa
app.get("/pessoa/tratamento/listar/:cod_conta/:cod_pessoa", (req, res) => {
  let SQL  = ' select tbl_paciente_tratamento.fky_especialidade_medico  cod_registro,';
      SQL += '        tbl_paciente_tratamento.fky_paciente,';      
      SQL += '        tbl_especialidade_medico.dsc_especialidade_medico dsc_registro';      
      SQL += ' from   tbl_paciente_tratamento';
      SQL += ' inner join tbl_especialidade_medico on (tbl_paciente_tratamento.fky_especialidade_medico = tbl_especialidade_medico.cod_especialidade_medico)';      
      SQL += ' where tbl_paciente_tratamento.fky_conta  = ?';
      SQL += '   and tbl_paciente_tratamento.fky_paciente = ?';

  db.query(SQL, [req.params.cod_conta, req.params.cod_pessoa], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

/*tbl_paciente_tratamento - Inserir*/
app.post("/pessoa/tratamento/inserir/:cod_conta", (req, res) => {
  const body = req.body;

  let SQL  = ' insert into tbl_paciente_tratamento (fky_conta, fky_paciente, fky_especialidade_medico)';
      SQL += ' values (?, ?, ?)';

  db.query(SQL, [req.params.cod_conta, body.fky_paciente, body.fky_especialidade_medico], (err, result) =>{
    if (err) console.log(err)
    else res.send(result.insertid);
  });
});

//tbl_paciente_tratamento - Excluir
app.delete("/pessoa/tratamento/excluir/:cod_conta/:fky_paciente/:fky_especialdade_medico", (req, res) => {
  let SQL  = ' delete from tbl_paciente_tratamento';
      SQL += ' where fky_conta                = ?';
      SQL += '   and fky_paciente             = ?';
      SQL += '   and fky_especialidade_medico = ?'

  db.query(SQL, [req.params.cod_conta, req.params.fky_paciente, req.params.fky_especialdade_medico], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

//****** Pessoa Doenca ******/

//tbl_paciente_doenca - Listar por pessoa
app.get("/pessoa/doenca/listar/:cod_conta/:cod_pessoa", (req, res) => {
  let SQL  = ' select tbl_paciente_doenca.fky_doenca cod_registro,';
      SQL += '        tbl_paciente_doenca.fky_paciente,';      
      SQL += '        tbl_doenca.dsc_doenca dsc_registro';      
      SQL += ' from   tbl_paciente_doenca';
      SQL += ' inner join tbl_doenca on (tbl_paciente_doenca.fky_doenca = tbl_doenca.cod_doenca)';      
      SQL += ' where tbl_paciente_doenca.fky_conta  = ?';
      SQL += '   and tbl_paciente_doenca.fky_paciente = ?';

  db.query(SQL, [req.params.cod_conta, req.params.cod_pessoa], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

/*tbl_paciente_doenca - Inserir*/
app.post("/pessoa/doenca/inserir/:cod_conta", (req, res) => {
  const body = req.body;

  let SQL  = ' insert into tbl_paciente_doenca (fky_conta, fky_paciente, fky_doenca)';
      SQL += ' values (?, ?, ?)';

  db.query(SQL, [req.params.cod_conta, body.fky_paciente, body.fky_doenca], (err, result) =>{
    if (err) console.log(err)
    else res.send(result.insertid);
  });
});

//tbl_paciente_doenca - Excluir
app.delete("/pessoa/doenca/excluir/:cod_conta/:fky_paciente/:fky_doenca", (req, res) => {
  let SQL  = ' delete from tbl_paciente_doenca';
      SQL += ' where fky_conta    = ?';
      SQL += '   and fky_paciente = ?';
      SQL += '   and fky_doenca  = ?'

  db.query(SQL, [req.params.cod_conta, req.params.fky_paciente, req.params.fky_doenca], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

//****** Pessoa Vacina ******/

//tbl_paciente_vacina - Listar por pessoa
app.get("/pessoa/vacina/listar/:cod_conta/:cod_pessoa", (req, res) => {
  let SQL  = ' select tbl_paciente_vacina.fky_vacina cod_registro,';
      SQL += '        tbl_paciente_vacina.fky_paciente,';
      SQL += '        tbl_vacina.dsc_vacina dsc_registro';
      SQL += ' from   tbl_paciente_vacina';
      SQL += ' inner join tbl_vacina on (tbl_paciente_vacina.fky_vacina = tbl_vacina.cod_vacina)';      
      SQL += ' where tbl_paciente_vacina.fky_conta  = ?';
      SQL += '   and tbl_paciente_vacina.fky_paciente = ?';

  db.query(SQL, [req.params.cod_conta, req.params.cod_pessoa], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

/*tbl_paciente_vacina - Inserir*/
app.post("/pessoa/vacina/inserir/:cod_conta", (req, res) => {
  const body = req.body;

  let SQL  = ' insert into tbl_paciente_vacina (fky_conta, fky_paciente, fky_vacina, num_dose, dat_dose)';
      SQL += ' values (?, ?, ?, ?, ?)';

  db.query(SQL, [req.params.cod_conta, body.fky_paciente, body.fky_vacina, body.num_dose, body.dat_dose], (err, result) =>{
    if (err) console.log(err)
    else res.send(result.insertid);
  });
});

//tbl_paciente_vacina - Excluir
app.delete("/pessoa/vacina/excluir/:cod_conta/:fky_paciente/:fky_vacina", (req, res) => {
  let SQL  = ' delete from tbl_paciente_vacina';
      SQL += ' where fky_conta    = ?';
      SQL += '   and fky_paciente = ?';
      SQL += '   and fky_vacina   = ?'

  db.query(SQL, [req.params.cod_conta, req.params.fky_paciente, req.params.fky_vacina], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

//****** Pessoa Servico Saude ******/

//tbl_paciente_servico_saude - Listar por pessoa
app.get("/pessoa/servico_saude/listar/:cod_conta/:cod_pessoa", (req, res) => {
  let SQL  = ' select tbl_paciente_servico_saude.fky_servico_saude cod_registro,';
      SQL += '        tbl_paciente_servico_saude.fky_paciente,';
      SQL += '        tbl_servico_saude.dsc_servico_saude dsc_registro';
      SQL += ' from   tbl_paciente_servico_saude';
      SQL += ' inner join tbl_servico_saude on (tbl_paciente_servico_saude.fky_servico_saude = tbl_servico_saude.cod_servico_saude)';      
      SQL += ' where tbl_paciente_servico_saude.fky_conta  = ?';
      SQL += '   and tbl_paciente_servico_saude.fky_paciente = ?';

  db.query(SQL, [req.params.cod_conta, req.params.cod_pessoa], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

/*tbl_paciente_servico_saude - Inserir*/
app.post("/pessoa/servico_saude/inserir/:cod_conta", (req, res) => {
  const body = req.body;

  let SQL  = ' insert into tbl_paciente_servico_saude (fky_conta, fky_paciente, fky_servico_saude)';
      SQL += ' values (?, ?, ?)';

  db.query(SQL, [req.params.cod_conta, body.fky_paciente, body.fky_servico_saude], (err, result) =>{
    if (err) console.log(err)
    else res.send(result.insertid);
  });
});

//tbl_paciente_servico_saude - Excluir
app.delete("/pessoa/servico_saude/excluir/:cod_conta/:fky_paciente/:fky_servico_saude", (req, res) => {
  let SQL  = ' delete from tbl_paciente_servico_saude';
      SQL += ' where fky_conta    = ?';
      SQL += '   and fky_paciente = ?';
      SQL += '   and fky_servico_saude   = ?'

  db.query(SQL, [req.params.cod_conta, req.params.fky_paciente, req.params.fky_servico_saude], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

//****** Pessoa Programa Social ******/

//tbl_paciente_programa_social - Listar por pessoa
app.get("/pessoa/programa_social/listar/:cod_conta/:cod_pessoa", (req, res) => {
  let SQL  = ' select tbl_paciente_programa_social.fky_programa_social cod_registro,';
      SQL += '        tbl_paciente_programa_social.fky_paciente,';
      SQL += '        tbl_programa_social.dsc_programa_social dsc_registro';
      SQL += ' from   tbl_paciente_programa_social';
      SQL += ' inner join tbl_programa_social on (tbl_paciente_programa_social.fky_programa_social = tbl_programa_social.cod_programa_social)';      
      SQL += ' where tbl_paciente_programa_social.fky_conta  = ?';
      SQL += '   and tbl_paciente_programa_social.fky_paciente = ?';

  db.query(SQL, [req.params.cod_conta, req.params.cod_pessoa], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

/*tbl_paciente_programa_social - Inserir*/
app.post("/pessoa/programa_social/inserir/:cod_conta", (req, res) => {
  const body = req.body;

  let SQL  = ' insert into tbl_paciente_programa_social (fky_conta, fky_paciente, fky_programa_social)';
      SQL += ' values (?, ?, ?)';

  db.query(SQL, [req.params.cod_conta, body.fky_paciente, body.fky_programa_social], (err, result) =>{
    if (err) console.log(err)
    else res.send(result.insertid);
  });
});

//tbl_paciente_programa_social - Excluir
app.delete("/pessoa/programa_social/excluir/:cod_conta/:fky_paciente/:fky_programa_social", (req, res) => {
  let SQL  = ' delete from tbl_paciente_programa_social';
      SQL += ' where fky_conta    = ?';
      SQL += '   and fky_paciente = ?';
      SQL += '   and fky_programa_social   = ?'

  db.query(SQL, [req.params.cod_conta, req.params.fky_paciente, req.params.fky_programa_social], (err, result) =>{
    if (err) console.log(err)
    else res.send(result);
  });
});

/****** Paciente ******/

//tbl_paciente - Listar - Dados do Paciente - 1 Registro
app.get("/pessoa/paciente/listar/:cod_conta/:cod_pessoa", (req, res) => {
  let SQL  = ' select *';
      SQL += ' from   tbl_paciente';
      SQL += ' where  fky_conta  = ?';
      SQL += '   and  fky_pessoa = ?';

  db.query(SQL, [req.params.cod_conta, req.params.cod_pessoa], (err, result) => {
    if (err){
      return res.status(500).send(err);
    } else{
      res.send(result);
    }
  });
});

//tbl_paciente - Editar e Inserir quando não encontrado
app.put("/pessoa/paciente/editar/:cod_conta/:cod_pessoa", (req, res) => {
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
      SQL +=     ' mem_dados_resguardado    = ?,';
  
    //Aba Social
      SQL +=     ' dsc_plano_saude            = ?,';
      SQL +=     ' dsc_paciente_lucido        = ?,';
      SQL +=     ' dsc_cirurgia_feita         = ?,';
      SQL +=     ' dsc_obs_covid_19           = ?,';
      SQL +=     ' dsc_usa_medicamento        = ?,';
      SQL +=     ' dsc_usou_outra_instituicao = ?,';
      SQL +=     ' dsc_condicao_habitual      = ?,';
      SQL +=     ' dbl_valor_medicamento      = ?,';
      SQL +=     ' dat_teve_covid_19          = ?,';
      SQL +=     ' flg_medicamento_caro       = ?,';
      SQL +=     ' flg_auxilio_banho          = ?,';
      SQL +=     ' flg_auxilio_alimentacao    = ?,';
      SQL +=     ' flg_auxilio_locomocao      = ?,';
      SQL +=     ' flg_auxilio_vestimenta     = ?,';
      SQL +=     ' flg_auxilio_higiene        = ?,';
      SQL +=     ' flg_usa_frauda             = ?,';
      SQL +=     ' flg_paciente_lucido        = ?,';
      SQL +=     ' flg_fez_cirurgia           = ?,';
      SQL +=     ' flg_teve_covid_19          = ?,';
      SQL +=     ' num_cartao_sus             = ?,';

    //Aba Saude
      SQL +=     ' mem_diagnostico_medico            = ?,';
      SQL +=     ' mem_diagnostico_fisioterapico     = ?,';
      SQL +=     ' dsc_diagnostico_fisioterapico_qp  = ?,';
      SQL +=     ' dsc_diagnostico_fisioterapico_hma = ?,';
      SQL +=     ' dsc_diagnostico_fisioterapico_hp  = ?,';
      SQL +=     ' dsc_diagnostico_fisioterapico_hf  = ?,';

    //Aba Fisico
      SQL +=     ' dsc_pressao_arterial        = ?,';
      SQL +=     ' dsc_frequencia_cardiaca     = ?,';
      SQL +=     ' dsc_frequencia_pulso        = ?,';
      SQL +=     ' dsc_frequencia_respiratoria = ?,';
      SQL +=     ' dsc_temperatura_corporal    = ?,';    
      
      SQL +=     ' flg_postura_cabeca          = ?,';
      SQL +=     ' flg_postura_ombro           = ?,';
      SQL +=     ' flg_postura_clavicula       = ?,';
      SQL +=     ' flg_postura_cotovelo        = ?,';
      SQL +=     ' flg_postura_antebraco       = ?,';
      SQL +=     ' flg_postura_eias            = ?,';
      SQL +=     ' flg_postura_joelho          = ?,';
      SQL +=     ' flg_postura_patela          = ?,';
      SQL +=     ' flg_postura_pe              = ?,';
      SQL +=     ' flg_postura_tornozelo       = ?,';
      SQL +=     ' flg_postura_coluna_cervical = ?,';
      SQL +=     ' flg_postura_coluna_toracica = ?,';
      SQL +=     ' flg_postura_coluna_lombar   = ?,';

      SQL +=     ' flg_sistema_osteomioarticular = ?,';

      SQL +=     ' flg_tonus_muscular = ?,';
      
      SQL +=     ' flg_forca_muscular_mmss = ?,';
      SQL +=     ' flg_forca_muscular_mmii = ?,';
      SQL +=     ' flg_amplitude_muscular  = ?,';
      SQL +=     ' dsc_adm_passiva_mmss    = ?,';
      SQL +=     ' dsc_adm_passiva_mmii    = ?,';
      SQL +=     ' dsc_adm_ativa_mmss      = ?,';
      SQL +=     ' dsc_adm_ativa_mmii      = ?,';
      
      SQL +=     ' dsc_tegumentar_pele           = ?,';
      SQL +=     ' flg_tegumentar_elasticidade   = ?,';
      SQL +=     ' flg_tegumentar_desidratacao   = ?,';
      SQL +=     ' flg_tegumentar_mancha         = ?,';
      SQL +=     ' dsc_local_mancha              = ?,';
      SQL +=     ' flg_tegumentar_coloracao      = ?,';
      SQL +=     ' dsc_local_coloracao           = ?,';
      SQL +=     ' flg_tegumentar_temperatura    = ?,';
      SQL +=     ' dsc_local_temperatura         = ?,';
      SQL +=     ' flg_tegumentar_sensibilidade  = ?,';
      SQL +=     ' dsc_local_sensibilidade       = ?,';
      
      SQL +=     ' dsc_equilibrio_mao_cabeca   = ?,';
      SQL +=     ' dsc_equilibrio_mao_ombro    = ?,';      
      SQL +=     ' dsc_equilibrio_cruzar_perna = ?,';

      SQL +=     ' dsc_coordenacao_msd              = ?,';
      SQL +=     ' dsc_coordenacao_mse              = ?,';
      SQL +=     ' dsc_coordenacao_nariz_msd        = ?,';
      SQL +=     ' dsc_coordenacao_nariz_mse        = ?,';
      SQL +=     ' dsc_coordenacao_motricidade_fina = ?,';
      SQL +=     ' dsc_coordenacao_alcance          = ?,';
      SQL +=     ' dsc_coordenacao_preensao         = ?,';
      SQL +=     ' dsc_coordenacao_manipulacao      = ?,';
      SQL +=     ' dsc_coordenacao_cognitivo        = ?,';
      SQL +=     ' dsc_coordenacao_psiquiatrico     = ?,';
      SQL +=     ' dsc_coordenacao_psicologico      = ?';

      SQL += ' where fky_conta  = ?';
      SQL += '   and fky_pessoa = ?';

  db.query(SQL, [body.dsc_filiacao_pai, body.dsc_filiacao_mae, body.dsc_religiao, body.dsc_tipo_renda, body.dsc_cidade_ant, body.dat_residencia_cidade, body.dbl_valor_renda,
                 body.fky_curador, body.flg_estado_civil, body.flg_frequenta_religiao, body.flg_possui_filho, body.flg_possui_casa_propria, body.flg_possui_renda, body.flg_paciente_interditado,
                 body.int_quant_filho, body.int_quant_filho_vivo, body.mem_dados_resguardado, body.dsc_plano_saude, body.dsc_paciente_lucido, body.dsc_cirurgia_feita, body.dsc_obs_covid_19,
                 body.dsc_usa_medicamento, body.dsc_usou_outra_instituicao, body.dsc_condicao_habitual, body.dbl_valor_medicamento, body.dat_teve_covid_19, body.flg_medicamento_caro,
                 body.flg_auxilio_banho, body.flg_auxilio_alimentacao, body.flg_auxilio_locomocao, body.flg_auxilio_vestimenta, body.flg_auxilio_higiene, body.flg_usa_frauda,
                 body.flg_paciente_lucido, body.flg_fez_cirurgia, body.flg_teve_covid_19, body.num_cartao_sus, body.mem_diagnostico_medico, body.mem_diagnostico_fisioterapico,
                 body.dsc_diagnostico_fisioterapico_qp, body.dsc_diagnostico_fisioterapico_hma, body.dsc_diagnostico_fisioterapico_hp, body.dsc_diagnostico_fisioterapico_hf,
                 body.dsc_pressao_arterial, body.dsc_frequencia_cardiaca, body.dsc_frequencia_pulso, body.dsc_frequencia_respiratoria, body.dsc_temperatura_corporal, body.flg_postura_cabeca,
                 body.flg_postura_ombro, body.flg_postura_clavicula, body.flg_postura_cotovelo, body.flg_postura_antebraco, body.flg_postura_eias, body.flg_postura_joelho,
                 body.flg_postura_patela, body.flg_postura_pe, body.flg_postura_tornozelo, body.flg_postura_coluna_cervical, body.flg_postura_coluna_toracica, body.flg_postura_coluna_lombar,
                 body.flg_sistema_osteomioarticular, body.flg_tonus_muscular, body.flg_forca_muscular_mmss, body.flg_forca_muscular_mmii, body.flg_amplitude_muscular, body.dsc_adm_passiva_mmss,
                 body.dsc_adm_passiva_mmii, body.dsc_adm_ativa_mmss, body.dsc_adm_ativa_mmii, body.dsc_tegumentar_pele, body.flg_tegumentar_elasticidade, body.flg_tegumentar_desidratacao,
                 body.flg_tegumentar_mancha, body.dsc_local_mancha, body.flg_tegumentar_coloracao, body.dsc_local_coloracao, body.flg_tegumentar_temperatura, body.dsc_local_temperatura,
                 body.flg_tegumentar_sensibilidade, body.dsc_local_sensibilidade, body.dsc_equilibrio_mao_cabeca, body.dsc_equilibrio_mao_ombro, body.dsc_equilibrio_cruzar_perna,
                 body.dsc_coordenacao_msd, body.dsc_coordenacao_mse, body.dsc_coordenacao_nariz_msd, body.dsc_coordenacao_nariz_mse, body.dsc_coordenacao_motricidade_fina,
                 body.dsc_coordenacao_alcance, body.dsc_coordenacao_preensao, body.dsc_coordenacao_manipulacao, body.dsc_coordenacao_cognitivo, body.dsc_coordenacao_psiquiatrico,
                 body.dsc_coordenacao_psicologico, req.params.cod_conta, req.params.cod_pessoa], (err, result) =>{
    if (err) console.log(err)
    else{

    //Se não encontrou - Insere  
      if (result.affectedRows === 0) {
        SQL  = ' insert into tbl_paciente (fky_conta, fky_pessoa, dsc_filiacao_pai, dsc_filiacao_mae, dsc_religiao, dsc_tipo_renda, dsc_cidade_ant, dat_residencia_cidade, dbl_valor_renda,';
        SQL +=                           ' fky_curador, flg_estado_civil, flg_frequenta_religiao, flg_possui_filho, flg_possui_casa_propria, flg_possui_renda, flg_paciente_interditado,';
        SQL +=                           ' int_quant_filho, int_quant_filho_vivo, mem_dados_resguardado, dsc_plano_saude, dsc_paciente_lucido, dsc_cirurgia_feita, dsc_obs_covid_19,';
        SQL +=                           ' dsc_usa_medicamento, dsc_usou_outra_instituicao, dsc_condicao_habitual, dbl_valor_medicamento, dat_teve_covid_19, flg_medicamento_caro,';
        SQL +=                           ' flg_auxilio_banho, flg_auxilio_alimentacao, flg_auxilio_locomocao, flg_auxilio_vestimenta, flg_auxilio_higiene, flg_usa_frauda, flg_paciente_lucido,';
        SQL +=                           ' flg_fez_cirurgia, flg_teve_covid_19, num_cartao_sus, mem_diagnostico_medico, mem_diagnostico_fisioterapico, dsc_diagnostico_fisioterapico_qp,';
        SQL +=                           ' dsc_diagnostico_fisioterapico_hma, dsc_diagnostico_fisioterapico_hp, dsc_diagnostico_fisioterapico_hf, dsc_pressao_arterial, dsc_frequencia_cardiaca,';
        SQL +=                           ' dsc_frequencia_pulso, dsc_frequencia_respiratoria, dsc_temperatura_corporal, flg_postura_cabeca, flg_postura_ombro, flg_postura_clavicula,';
        SQL +=                           ' flg_postura_cotovelo, flg_postura_antebraco, flg_postura_eias, flg_postura_joelho, flg_postura_patela, flg_postura_pe, flg_postura_tornozelo,';
        SQL +=                           ' flg_postura_coluna_cervical, flg_postura_coluna_toracica, flg_postura_coluna_lombar, flg_sistema_osteomioarticular, flg_tonus_muscular,';
        SQL +=                           ' flg_forca_muscular_mmss, flg_forca_muscular_mmii, flg_amplitude_muscular, dsc_adm_passiva_mmss, dsc_adm_passiva_mmii, dsc_adm_ativa_mmss,';
        SQL +=                           ' dsc_adm_ativa_mmii, dsc_tegumentar_pele, flg_tegumentar_elasticidade, flg_tegumentar_desidratacao, flg_tegumentar_mancha, dsc_local_mancha,';
        SQL +=                           ' flg_tegumentar_coloracao, dsc_local_coloracao, flg_tegumentar_temperatura, dsc_local_temperatura, flg_tegumentar_sensibilidade,';
        SQL +=                           ' dsc_local_sensibilidade, dsc_equilibrio_mao_cabeca, dsc_equilibrio_mao_ombro, dsc_equilibrio_cruzar_perna, dsc_coordenacao_msd, dsc_coordenacao_mse,';
        SQL +=                           ' dsc_coordenacao_nariz_msd, dsc_coordenacao_nariz_mse, dsc_coordenacao_motricidade_fina, dsc_coordenacao_alcance, dsc_coordenacao_preensao,';
        SQL +=                           ' dsc_coordenacao_manipulacao, dsc_coordenacao_cognitivo, dsc_coordenacao_psiquiatrico, dsc_coordenacao_psicologico)';
        SQL += ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,';
        SQL +=         ' ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        db.query(SQL, [req.params.cod_conta, body.fky_pessoa, body.dsc_filiacao_pai, body.dsc_filiacao_mae, body.dsc_religiao, body.dsc_tipo_renda, body.dsc_cidade_ant, body.dat_residencia_cidade,
                       body.dbl_valor_renda, null, body.flg_estado_civil, body.flg_frequenta_religiao, body.flg_possui_filho, body.flg_possui_casa_propria, body.flg_possui_renda,
                       body.flg_paciente_interditado, body.int_quant_filho, body.int_quant_filho_vivo, body.mem_dados_resguardado, body.dsc_plano_saude, body.dsc_paciente_lucido,
                       body.dsc_cirurgia_feita, body.dsc_obs_covid_19, body.dsc_usa_medicamento, body.dsc_usou_outra_instituicao, body.dsc_condicao_habitual, body.dbl_valor_medicamento,
                       body.dat_teve_covid_19, body.flg_medicamento_caro, body.flg_auxilio_banho, body.flg_auxilio_alimentacao, body.flg_auxilio_locomocao, body.flg_auxilio_vestimenta,
                       body.flg_auxilio_higiene, body.flg_usa_frauda, body.flg_paciente_lucido, body.flg_fez_cirurgia, body.flg_teve_covid_19, body.num_cartao_sus, body.mem_diagnostico_medico,
                       body.mem_diagnostico_fisioterapico, body.dsc_diagnostico_fisioterapico_qp, body.dsc_diagnostico_fisioterapico_hma, body.dsc_diagnostico_fisioterapico_hp,
                       body.dsc_diagnostico_fisioterapico_hf, body.dsc_pressao_arterial, body.dsc_frequencia_cardiaca, body.dsc_frequencia_pulso, body.dsc_frequencia_respiratoria,
                       body.dsc_temperatura_corporal, body.flg_postura_cabeca, body.flg_postura_ombro, body.flg_postura_clavicula, body.flg_postura_cotovelo, body.flg_postura_antebraco,
                       body.flg_postura_eias, body.flg_postura_joelho, body.flg_postura_patela, body.flg_postura_pe, body.flg_postura_tornozelo, body.flg_postura_coluna_cervical,
                       body.flg_postura_coluna_toracica, body.flg_postura_coluna_lombar, body.flg_sistema_osteomioarticular, body.flg_tonus_muscular, body.flg_forca_muscular_mmss,
                       body.flg_forca_muscular_mmii, body.flg_amplitude_muscular, body.dsc_adm_passiva_mmss, body.dsc_adm_passiva_mmii, body.dsc_adm_ativa_mmss, body.dsc_adm_ativa_mmii,
                       body.dsc_tegumentar_pele, body.flg_tegumentar_elasticidade, body.flg_tegumentar_desidratacao, body.flg_tegumentar_mancha, body.dsc_local_mancha,
                       body.flg_tegumentar_coloracao, body.dsc_local_coloracao, body.flg_tegumentar_temperatura, body.dsc_local_temperatura, body.flg_tegumentar_sensibilidade,
                       body.dsc_local_sensibilidade, body.dsc_equilibrio_mao_cabeca, body.dsc_equilibrio_mao_ombro, body.dsc_equilibrio_cruzar_perna, body.dsc_coordenacao_msd,
                       body.dsc_coordenacao_mse, body.dsc_coordenacao_nariz_msd, body.dsc_coordenacao_nariz_mse, body.dsc_coordenacao_motricidade_fina, body.dsc_coordenacao_alcance,
                       body.dsc_coordenacao_preensao, body.dsc_coordenacao_manipulacao, body.dsc_coordenacao_cognitivo, body.dsc_coordenacao_psiquiatrico, body.dsc_coordenacao_psicologico], (err, result) =>{
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

/****** Especialidade Medico ******/

//tbl_especialidade_medico - Listar
app.get("/especialidade_medico/listar/:cod_conta", (req, res) => {
  let lFiltro =  ' where fky_conta = ?';      

  let SQL  = ' select *';
      SQL += ' from   tbl_especialidade_medico';
      SQL += lFiltro; //where
      SQL += ' order by dsc_especialidade_medico';

  db.query(SQL, [req.params.cod_conta], (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

/****** Doença ******/

//tbl_doenca - Listar
app.get("/doenca/listar/:cod_conta", (req, res) => {
  let lFiltro =  ' where fky_conta = ?';      

  let SQL  = ' select *';
      SQL += ' from   tbl_doenca';
      SQL += lFiltro; //where
      SQL += ' order by dsc_doenca';

  db.query(SQL, [req.params.cod_conta], (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

/****** Vacina ******/

//tbl_vacina - Listar
app.get("/vacina/listar/:cod_conta", (req, res) => {
  let lFiltro =  ' where fky_conta = ?';      

  let SQL  = ' select *';
      SQL += ' from   tbl_vacina';
      SQL += lFiltro; //where
      SQL += ' order by dsc_vacina';

  db.query(SQL, [req.params.cod_conta], (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

/****** Serviço Saude ******/

//tbl_servico_saude - Listar
app.get("/servico_saude/listar/:cod_conta", (req, res) => {
  let lFiltro =  ' where fky_conta = ?';      

  let SQL  = ' select *';
      SQL += ' from   tbl_servico_saude';
      SQL += lFiltro; //where
      SQL += ' order by dsc_servico_saude';

  db.query(SQL, [req.params.cod_conta], (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

/****** Programa Social ******/

//tbl_programa_social - Listar
app.get("/programa_social/listar/:cod_conta", (req, res) => {
  let lFiltro =  ' where fky_conta = ?';      

  let SQL  = ' select *';
      SQL += ' from   tbl_programa_social';
      SQL += lFiltro; //where
      SQL += ' order by dsc_programa_social';

  db.query(SQL, [req.params.cod_conta], (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

app.get("/", (req, res) => {
  res.send("<h1>Servidor Web no ar na porta 5000</h1>")
});

app.listen(5000, ()=>{
  console.log('Servidor Web no ar na porta 5000');
});