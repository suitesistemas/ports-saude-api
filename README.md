# Verificar se o Node esta instalado
node - v

  # Instale o Node
    intall node - Verificar

# Inicializando minha aplicação informando que o npm será meu gerenciador de pacotes
npm init;

# Instalando as depedências (cors, mysql, et) que esta no package.json (não necessário para novos projetos)
nmp install

# Inicia o GIT
git init

# Subindo Api para o AWS
  # Criando sua conta no AWS
    aw.amazon.com

  # EC2 {Elastic Cloud Computer - maquina virtual}
    pesquise por EC2
    altera a região se necessário (São Paulo)
    clique em running instance
    
    Criando uma máquina nova
      clique em Launche Instance
      verifique as 'free tier eligible' (gratuita)
      escolha uma máquina ubuntu
      Avance até o final (Review and Launch)
      
      Criando uma chave de assesso (Key pair)
        selecione: Create a new key par
                   informe um nome em 'key pair name' 
      clique em 'Dowload key Pair'
      pegue a chave e coloque na pasta raiz da sua api
      clique em 'View Instaces'

    Configurando o SSH - Windows 10 e superior
      Pesquise no Google: 'instal ssh windows'
      Abra o primeiro link (https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse?tabs=gui)
        Esse link contem um tutorial:
          pesquisar: 'Install OpenSSH for Windows')
          abra a aba 'Power Shell'
            abra o Power Shell (botão direito no meu iniciar, selecione 'Windows Power Shell (Admin)')    
          digite esse comando:
            Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
          comando acima irá verificar se SSH jah esta instalado (installed)
            se naõ tiver instalado:
            instale (no Power Shell) o OpenSSH Cliente rodando o comando:
              Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
      Dar permissão na key pair
        Clique com botão direito sobre o arquivo da chave
          Propriedade
            Segurança
              Avançadas
                Clique em 'Desabilitar herança'
                  Clique na primeira opção 'Converter as pemissões herdadas em permissões explícitas no objeto'
                Remova todas as permissoes (Remover)
                
                Clique em Adicionar
                  Clique em 'Selecionar uma entidade de segurança'
                  Na caixa de texto digite o nome do usuário e verifique os nomes
                  Confirme e na proxima tela deixe marcado 'Ler & executar', 'Leitura', 'Gravar'
        Confirme tudo

      Na tela de Instancias (Launch Instance) clique no botão Connect
        Passo 4 = dns público do servidor
        Example:
          Utilize o comando 'ssh -i "...' localizado em Example, para acessar via SSH no prompt
            tem que rodar na pasta que se encontra a Key Pair

    Dentro do servidor
      para atualizar rode os comandos:
        sudo apt-get update
        sudo apt-get updgrade

      instalar o node.js
        ver a partir do min. 11:30 - 12:14

      verificar se o git esta instalado com o comando:
        git-v
      instale se necessário

      Fazer o clone do GitHub para o Servidor
        pegue o clone (HTTPS) no GitHub e rode o comando no servidor:
        git clone https://github.com/suitesistemas/ports-saude-api.git ports-saude

        verificar a pasta criada com o comando:
          ls -la
        
        abra a pasta com o comando:
          cd ports-saude
        
        instale o pacodo no npm com o comando:
          npm install

        rodar o servidor com o comando:
          node index.js

    Volte na AWS na paginas das instancias (Launch Instance)
      utilize o IPV4 como o IP do servidor
        
      Liberar a porta utilizada no servidor
        clique no item da coluna 'Security Groups' (final da grid)
        se a opção estiver desabilitada siga os passos abaixo          
          clique no id da instancia
          abra a aba segurança
          crie uma nova regra

          informe a porta e o ip 000.000...
    
    Utilize a biblioteca pm2 para que o servidor fique rodando interupdatemente
      abra a pasta raiz (cd até chegar lah) para instalar global para todos projetos
      sudo npm install pm2 -g

      verificar se o pm2 esa rodando use o comando:
        pm2 -v

      verificar as aplicações rodando no pm2
        pm2 list

      parar as aplicaçãos rodando direto no index.js (caso tenha) para liberar a porta para rodar no pm2

      Rodando no pm2
        abra a pasta do sistema ex: cd mobile 
        iniciar a aplicacao - comando:
          pm2 start src/index.js --name=backend
            Obs: o name eh de livre digitacao
          
        parar a aplicacao - comando
          pm2 stop src=index.js
          ou
          pm2 stop backend

        reinicializar aplicação  
          pm2 restart backend

    Atualizar a api no servidor
     utilize o comando:
       git pull
     em seguida atualize o servidor com o comando:
       pm2 restart backend

# Aplicar Https na Api
Necessário instalar as bibliotecas:
  npm i cors -s
  npm i https -s
  npm i fs -s

Abra um Gerador de Certificado SSL
 exemplo: https://pt.rakko.tools/tools/46/

Crie uma pasta chamada 'ssl' na raiz do projeto e salve os tokens gerados nela

No index.js importe as dependencias
  import fs    from 'fs';
  import https from 'https';
  import cors  from 'cors';  

continue...

Utilize a porta 443 -> padrão SSL

    





    
            
          


        

      

          

      

      

          

      

    

  



