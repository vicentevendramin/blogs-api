# Blogs API Project

Este projeto é uma API REST de um Blog, sendo possivel realizar cadastro, atualizar dados e consultar usuários e posts.

<br />

Tecnologias utilizadas:

- JavaScript
- NodeJS
- Express
- Sequelize
- MySQL

---

<details>
  <summary  id="diagrama"><strong>Diagrama ER</strong></summary>

  #### Diagrama de Entidade-Relacionamento

  ![DER](./public/der.png)
<br />
</details>

<details>
  <summary  id="diagrama"><strong>Entidades</strong></summary>

  #### Formato das entidades

  - Tabela **users**

    | id  | display_name    | email           | password | image                                                                                   |
    | --- | --------------- | --------------- | -------- | --------------------------------------------------------------------------------------- |
    | 1   | Vicente Vendramin | guesser.vicente@gmail.com | 123456   | https://media.licdn.com/dms/image/D4D35AQEZa1DCWLemaQ/profile-framedphoto-shrink_200_200/0/1680628455542?e=1684796400&v=beta&t=oC2iQRj8AuAj_etoe5mIcFmimj-8KS8miTqmWF4OVFs |

  - Tabela **categories**

    | id  | name |
    | --- | ---- |
    | 18  | News |

  - Tabela **blog_posts**

    | id  | title                      | content                                                | user_id | published                | updated                  |
    | --- | -------------------------- | ------------------------------------------------------ | ------- | ------------------------ | ------------------------ |
    | 21  | Latest updates, August 1st | The whole text for the blog post goes here in this key | 14  // Chave estrangeira, referenciando o id de `users`    | 2011-08-01T19:58:00.000Z | 2011-08-01T19:58:51.947Z |


  - Tabela **PostCategories**

    | post_id | category_id |
    | ------- | ----------- |
    | 50 // Chave primária e estrangeira, referenciando o id de `BlogPosts`     | 20  // Chave primária e estrangeira, referenciando o id de `Categories`     |
<br />
</details>

# 🐋 Rodando no Docker

**Seu docker-compose precisa estar na versão 1.29 ou superior.**

Rode  o comando `docker-compose up -d --build`.

- Este irá inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`;

- Com eles, você pode rodar o container `blogs_api` via CLI ou abri-lo no VS Code;

Use o comando `docker exec -it blogs_api bash`.

- Ele te dará acesso ao terminal interativo do container criado pelo compose.

Instale as dependências, dentro do container, com `npm install`.

# Endpoints

- GET ```/user```
- GET ```/user/:id```
- GET ```/categories```
- GET ```/post```
- GET ```/post/:id```
- GET ```/post/search?q=:searchTerm```

---

- POST ```/login```
  ``` JavaScript
    {
      "email": "guesser.vicente@gmail.com",
      "password": "123456"
    }
  ```
- POST ```/user```
  ``` JavaScript
    {
      "displayName": "Vicente Vendramin",
      "email": "guesser.vicente@gmail.com",
      "password": "123456",
      "image": "https://media.licdn.com/dms/image/D4D35AQEZa1DCWLemaQ/profile-framedphoto-shrink_200_200/0/1680628455542?e=1684796400&v=beta&t=oC2iQRj8AuAj_etoe5mIcFmimj-8KS8miTqmWF4OVFs"
    }
  ```
- POST ```/categories```
  ``` JavaScript
    {
      "name": "Typescript"
    }
  ```
- POST ```/post```
  ``` JavaScript
    {
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key",
      "categoryIds": [1, 2]
    }
  ```

---

- PUT ```/post/:id```
  ``` JavaScript
    {
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key"
    }
  ```

---

- DELETE ```/user/me```
- DELETE ```/post/:id```