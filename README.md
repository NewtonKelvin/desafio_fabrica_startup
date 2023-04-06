# **Desafio de Node.JS**

## Desafio - Fábrica de Startup:
API para gerenciar um cardápio online.

## Como configurar o ambiente
> Obs.: Certifique-se de ter o **Node** e **npm** instalado em seu computador

> Login: `recrutador`
> Password: `123456`


 1. Clone o repositório em seu computador
 2. Execute o comando `npm install`
 3. Altere as variáveis de ambiente no arquivo `.env` na raiz do projeto
    1. Troque o valor da variável `IPV4` pelo seu **IPV4 local**
    2. Troque o valor da variável `PORT` por uma porta livre
 4. Com o terminal aberto na pasta raiz do projeto digite o comando `npm run`
 5. Abra o projeto com o link de `Server` disposto no console ao iniciar a aplicação
 6. Abra a documentação com o link de `Swagger` disposto no console ao iniciar a aplicação
 7. Na rota `/auth/login` digite as credenciais login e senha
 8. Cole o Token JWT na Autenticação do Swagger e pronto, você já pode testar as API's!

## Comandos / Atalhos

- `npm install` instala todas as dependências
- `npm run dev` roda o servidor node para utilizar o projeto
- `rs` reinicia o servidor node já em execução
- `ctrl + c` finaliza o servidor node em execução
- `npx eslint src/**` roda o eslint que faz uma varredura por erros e pontos de atenção no código

## Tecnologias / Frameworks / Bibliotecas

- **express:** Framework que fornece recursos para criação de aplicativos
- **body-parser:** Um middleware que analisa o corpo das requisições antes da manipulação
- **cors:** Biblioteca de segurança que permite que a aplicação possa interagir com recursos de outra origem
- **eslint:** Ferramenta que analisa o código e ajuda a encontrar erros 
- **swagger:** Farramenta que possibilita a criação de uma documentação detalhada das requisições possibilitando testes e dispensando a utilização de um API Client
- **typescript / ts-node:** Adiciona tipagem ao javascript ajudando a evitar erros e deixando o desenvolvimento mais eficiente
- **bcrypt:** Biblioteca para criptografia de senha utilizado para garantir a segurança
- **dotenv:** Biblioteca que carrega as variáveis de ambiente do arquivo .env facilitando o uso de variáveis globais
- **jsonwebtoken:** Biblioteca para criação de uma assinatura usada para autenticar o usuário
- **mongoose:** Biblioteca para conexão com o banco de dados MongoDB
- **@types/...:** Tipagem das bibliotecas para suporte ao typescript
- **nodemon:** Dependência que monitora o código e reinicia o servidor node após alguma alteração no código