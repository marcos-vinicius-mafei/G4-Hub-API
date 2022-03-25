<h2 align="center"><img src="./g4.svg" alt="G4Hub" width="150px"></h2>

<h1 align="center">G4mes HUB - API</h1>
    Aqui os usuários podem curtir os seus jogos preferidos e as plataformas que mais utilizam, dessa forma, outros usuários também poderam ver o seu perfil e interesses, assim podendo compartilhar informações e afeições em comum.

## **Tecnologias**

Para a construção da nossa API foram utilizadas as seguintes tecnologias: Express.js, Node.js, MongoDB e Heroku cloud.

## **Endpoints**

A API possui 11 endpoints para visualização de usuário, jogos, plataformas, likes e comentários. Além disso, existem os endpoints que podem ser utilizados para cadastro e login de usuários.

O URL base da API é https://g4-hub-api.herokuapp.com/

**<h1 align="center">Endpoints de usuário</h1>**

<h2 align ='center'> Criação de usuário </h2>

`POST /users/register - FORMATO DA REQUISIÇÃO`

```json
{
  "username": "demo",
  "email": "demo@gmail.com",
  "password": "123456",
  "plataform": "PC"
}
```

Caso dê tudo certo, a resposta será assim:

`FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "username": "demo",
  "email": "demo@gmail.com",
  "password": "$2a$10$cb42hygQ63Gb5pObic/LhuB8qChpzFffVXxKO3UIEG4DYTSC5mR42",
  "plataform": "PC",
  "img": "https://i.imgur.com/CGv8oZ7.png",
  "description": "Olá eu estou usando o G4Hub!",
  "likedGames": [],
  "_id": "623cd55c060c9b27d107109b",
  "__v": 0
}
```

<h2 align ='center'> Login </h2>

`POST /users/login - FORMATO DA REQUISIÇÃO`

```json
{
  "email": "demo@gmail.com",
  "password": "123456"
}
```

Caso dê tudo certo, a resposta será assim:

`FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "user": {
    "_id": "623cd55c060c9b27d107109b",
    "username": "demo",
    "email": "demo@gmail.com",
    "password": "$2a$10$cb42hygQ63Gb5pObic/LhuB8qChpzFffVXxKO3UIEG4DYTSC5mR42",
    "plataform": "PC",
    "img": "https://i.imgur.com/CGv8oZ7.png",
    "description": "Olá eu estou usando o G4Hub!",
    "likedGames": [],
    "__v": 0
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjNjZDU1YzA2MGM5YjI3ZDEwNzEwOWIiLCJpYXQiOjE2NDgxNTQxMzB9.9_ozAfMaKvcM59kdRHrm1_7UFMxEYBBsHLYANDzeVY8"
}
```

<h2 align ='center'>Listando usuário</h2>

`GET /users/:userId - FORMATO DA REQUISIÇÃO`

Caso dê tudo certo, a resposta será assim:

`FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "_id": "623cd55c060c9b27d107109b",
  "username": "demo",
  "email": "demo@gmail.com",
  "password": "$2a$10$cb42hygQ63Gb5pObic/LhuB8qChpzFffVXxKO3UIEG4DYTSC5mR42",
  "plataform": "PC",
  "img": "https://i.imgur.com/CGv8oZ7.png",
  "description": "Olá eu estou usando o G4Hub!",
  "likedGames": [],
  "__v": 0
}
```

<h2 align ='center'>Atualizando os dados do usuário</h2>

`PUT /users/:userId - FORMATO DA REQUISIÇÃO`

```json
{
  "username": "Marcos Mafei",
  "email": "demo@gmail.com",
  "password": "123456"
}
```

```js
{headers:{"auth-token": userToken}}
```

Caso dê tudo certo, a resposta será assim:

`FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "acknowledged": true,
  "modifiedCount": 1, //Usuário modificado
  "upsertedId": null,
  "upsertedCount": 0,
  "matchedCount": 1 //Usuário encontrado
}
```

<h1 align="center">Curtir jogos</h1>

<h2 align ='center'>Curtir/Descurtir</h2>

`POST /likes/ - FORMATO DA REQUISIÇÃO`

```json
{
  "slug": "grand-theft-auto-v",
  "gameLiked": {
    //game object
    "id": 3498,
    "slug": "grand-theft-auto-v",
    "name": "Grand Theft Auto V",
    "released": "2013-09-17",
    "tba": false,
    "background_image": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg"
  }
}
```

```js
{headers:{"auth-token": userToken}}
```

Caso dê tudo certo, a resposta será assim:

`FORMATO DA RESPOSTA - STATUS 200`

Caso o usuário ainda não tenha dado like no jogo:

```json
{
  "slug": "grand-theft-auto-v",
  "gameLiked": {
    "id": 3498,
    "slug": "grand-theft-auto-v",
    "name": "Grand Theft Auto V",
    "released": "2013-09-17",
    "tba": false,
    "background_image": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg"
  },
  "userId": "623cd55c060c9b27d107109b",
  "_id": "623cdc92060c9b27d1071108",
  "__v": 0
}
```

Caso o usuário já tenha dado like no jogo:

```json
{
  "acknowledged": true,
  "deletedCount": 1 //Like excluído
}
```

<h2 align ='center'>Jogos curtidos por um usuário</h2>

`GET /likes/user/:userId - FORMATO DA REQUISIÇÃO`

Caso dê tudo certo, a resposta será assim:

`FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "user": {
    "_id": "623cd55c060c9b27d107109b",
    "username": "Marcos Mafei",
    "email": "demo@gmail.com",
    "password": "$2a$10$cb42hygQ63Gb5pObic/LhuB8qChpzFffVXxKO3UIEG4DYTSC5mR42",
    "plataform": "PC",
    "img": "https://i.imgur.com/CGv8oZ7.png",
    "description": "Olá eu estou usando o G4Hub!",
    "__v": 0
  },
  "likedGames": []
}
```

<h1 align="center">Avaliação de jogos</h1>

<h2>Avaliar um jogo</h2>

`POST /grades/ - FORMATO DA REQUISIÇÃO`

```json
{
  "slug": "elden-ring", //slug do jogo(nome do game sem espaços e letras maiúsculas)
  "grade": 5 //nota de 1-5
}
```

```js
{headers:{"auth-token": userToken}}
```

`FORMATO DA RESPOSTA - STATUS 200`

Primeira vez avaliando o jogo:

```json
{} //Nota salva
```

Reavaliando o jogo:

```json
{
  "acknowledged": true,
  "modifiedCount": 1, //Nota atualizada com o novo valor
  "upsertedId": null,
  "upsertedCount": 0,
  "matchedCount": 1
}
```

<h2>Ver todas as notas de um jogo</h2>

`GET /grades/:gameSlug - FORMATO DA REQUISIÇÃO`

Caso dê tudo certo, a resposta será assim:

`FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "_id": "623b80220fad35d553ebed58",
    "slug": "halo-infinite",
    "grade": 5,
    "userId": "6238dc2c1dba6757f8b36183",
    "__v": 0
  },
  {
    "_id": "623be3d5d0a7ba630386f3f3",
    "slug": "halo-infinite",
    "grade": 4,
    "userId": "62391dcb76a81ec5c8c5a8b3",
    "__v": 0
  },
  {
    "_id": "623ca9e8060c9b27d1070c43",
    "slug": "halo-infinite",
    "grade": 4,
    "userId": "623b74fa9d5636f28622b959",
    "__v": 0
  }
]
```

<h1 align="center">Comentários</h1>

<h2>Postar comentários</h2>

`POST /comments/ - FORMATO DA REQUISIÇÃO`

```json
{
  "text": "wow, so cool!",
  "gameName": "God of War",
  "gameSlug": "god-of-war-2"
}
```

```js
{headers:{"auth-token": userToken}}
```

Caso dê tudo certo, a resposta será assim:

`FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "text": "wow, so cool!",
  "gameName": "God of War",
  "gameSlug": "god-of-war-2",
  "userId": "623cd55c060c9b27d107109b",
  "likes": 0,
  "usefullPost": 0,
  "whoLiked": [],
  "user": {
    "_id": "623cd55c060c9b27d107109b",
    "username": "Marcos Mafei",
    "email": "demo@gmail.com",
    "password": "$2a$10$cb42hygQ63Gb5pObic/LhuB8qChpzFffVXxKO3UIEG4DYTSC5mR42",
    "plataform": "PC",
    "img": "https://i.imgur.com/CGv8oZ7.png",
    "description": "Olá eu estou usando o G4Hub!",
    "likedGames": [],
    "__v": 0
  },
  "_id": "623cf3e0060c9b27d107119b",
  "__v": 0
}
```

<h2>Listar comentários do usuário</h2>

`GET /comments/user/:userId - FORMATO DA REQUISIÇÃO`

Caso dê tudo certo, a resposta será assim:

`FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "user": {
    "_id": "623cd55c060c9b27d107109b",
    "username": "Marcos Mafei",
    "email": "demo@gmail.com",
    "password": "$2a$10$cb42hygQ63Gb5pObic/LhuB8qChpzFffVXxKO3UIEG4DYTSC5mR42",
    "plataform": "PC",
    "img": "https://i.imgur.com/CGv8oZ7.png",
    "description": "Olá eu estou usando o G4Hub!",
    "likedGames": [],
    "__v": 0
  },
  "comments": [
    {
      "_id": "623cf3e0060c9b27d107119b",
      "text": "wow, so cool!",
      "gameName": "God of War",
      "gameSlug": "god-of-war-2",
      "userId": "623cd55c060c9b27d107109b",
      "likes": 0,
      "usefullPost": 0,
      "whoLiked": [],
      "__v": 0
    }
  ]
}
```

<h2>Listar comentários de um jogo</h2>

`GET /comments/game/:slug - FORMATO DA REQUISIÇÃO`

Caso dê tudo certo, a resposta será assim:

`FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "_id": "623b57b79d5636f28622b7a4",
    "text": "esquerda quatro morte é muito bom, vários zumbis maratonistas atrás de ti e teus amigos",
    "gameName": "Left 4 Dead 2",
    "gameSlug": "left-4-dead-2",
    "userId": "6239c37006df67b7ad5b15cc",
    "likes": 0,
    "usefullPost": 0,
    "whoLiked": [],
    "user": {
      "_id": "6239c37006df67b7ad5b15cc",
      "username": "Marmiteiro",
      "email": "marmiteiro@teste.com",
      "password": "$2a$10$ys5.Exe1g2.5F0I144f5V.UQfvMJ9wdAZeE0V7HWILBpnm1B7XEdS",
      "plataform": "PC",
      "img": "https://i.imgur.com/U4zuxo8.jpg",
      "description": "Olá eu estou usando o G4Hub!",
      "likedGames": [],
      "__v": 0
    },
    "__v": 0
  }
]
```

<h2>Curtir/Descurtir um comentário</h2>

`POST /comments/:commentId/like - FORMATO DA REQUISIÇÃO`

```json
{
  "userId": "62391dcb76a81ec5c8c5a8b3"
}
```

`FORMATO DA RESPOSTA - STATUS 200`

Primeira vez dando like:

```json
{
  "updateComment": {
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
  },
  "liked": "liked" //comentário foi curtido
}
```

Segunda vez:

```json
{
  "acknowledged": true,
  "modifiedCount": 1, //comentário atualizado sem o like
  "upsertedId": null,
  "upsertedCount": 0,
  "matchedCount": 1
}
```

<h2>Deletar comentários</h2>

`DELETE /comments/:commentId/ - FORMATO DA REQUISIÇÃO`

```js
{headers:{"auth-token": userToken}}
```

Caso dê tudo certo, a resposta será assim:

`FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```

---
Made by Marcos Mafei ✍️
