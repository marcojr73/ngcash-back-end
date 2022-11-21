
# NGCASH

<p align="center">
   <img width=350 src="https://raw.githubusercontent.com/marcojr73/ngcash-front-end/main/src/assets/images/logo.gif"/>
</p>


- Este projeto é inspirado na [NGCASH](https://ng.cash/), uma plataforma com o propósito de levar o controle e independência da vida financeira as novas gerações
- Você pode fazer o login com um nome de usuário e senha e começar a fazer suas transferências para outros usuários da aplicação

- [veja meu deploy na heroku aqui](https://ngcash-api.herokuapp.com/)
- [veja meu repositório front end dessa aplicação aqui](https://github.com/marcojr73/ngcash-front-end)

***

## Como usar

Instale meu projeto e configure o .env como no exemplo

```bash
  git clone git@github.com:marcojr73/ngcash-back-end.git
```

```bash
  npm install
  
  npm run migrate

  npm run dev
```

***

## Docker

- Com o docker você pode rodar todo o ambiente sem precisar instalar nenhum programa
- O front end estará disponivel na porta 3000, e a API na porta 5000
- Basta executar o comando na raiz do projeto

```bash
  docker-compose up --build
```

- Para encerrar a execução execute na raiz

```bash
  docker-compose down
```

***


##	 Tecnologias e Conceitos

- Node.js
- TypeScript
- Express
- ORM (prisma)
- Autenticação por token JWT
- Docker, Docker-compose
- Layered architecture
- Bcrypt
- JOI

***
    
## API Reference

#### Sign-up

```
  POST /sign-up
```

| sent by |Parameter | Type     |             
| :-------- |:-------- | :------- | 
| `body` |`userName` | `string` |
| `body` |`password` | `string` |

#### Sign-in

```
  POST /sign-in
```

| sent by |Parameter | Type     |             
| :-------- |:-------- | :------- | 
| `body` |`userName` | `string` |
| `body` |`password` | `string` |

#### Balance

```
  GET /account
```

| sent by |Parameter | Type     |                 
| :-------- |:-------- | :------- | 
| `header` |`authorization` | `Bearer token` | 


#### New transaction

```
  POST /transaction
```

| sent by |Parameter | Type     |                 
| :-------- |:-------- | :------- | 
| `header` |`authorization` | `Bearer token` | 
| `body` |`userName` | `string` | 
| `body` |`value` | `numer` | 


#### List historic transactions

```
  GET /transactions?type=cashin&initial=2022-11-20T00:49:16.681Z&final=2022-11-20T00:49:16.681Z
```

| sent by |Parameter | Type     |                 
| :-------- |:-------- | :------- | 
| `header` |`authorization` | `Bearer token` | 

type must be "cashin" | "cashout", initial and final must be a date timestamp