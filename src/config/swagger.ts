import dotenv from "dotenv";
dotenv.config();

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Desafio - NodeJS",
    description: "API para gerenciar um cardápio online.",
    version: "1.0.0",
    contact: {
      email: "kelvinnewtonsm@gmail.com",
    },
  },
  host: `${process.env.IPV4}`,
  basePath: "/",
  schemes: ["https", "http"],
  servers: [
    {
      url: `http://${process.env.IPV4}:${process.env.PORT}/`,
      description: "Development API",
    },
  ],
  paths: {
    "/auth/login": {
      get: {
        summary: "Login",
        description:
          "Rota responsável pelo login no sistema que devolve um token de autenticação",
        tags: ["Login"],
        parameters: [
          {
            name: "login",
            in: "query",
            description: "Nome de usuário",
            required: true,
          },
          {
            name: "password",
            in: "query",
            description: "Senha do usuário",
            required: true,
          },
        ],
        responses: {
          "401": {
            description: "Erro de validação",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
          "400": {
            description: "Falha ao logar",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
          "200": {
            description: "Logado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  $ref: "#/components/schemas/LoginResponse",
                },
              },
            },
          },
        },
      },
    },
    "/category": {
      get: {
        summary: "Listagem de categorias",
        description: "Rota responsável pela listagem de categorias",
        tags: ["Categoria"],
        parameters: [{}],
        security: [{ Authorization: [] }],
        responses: {
          "200": {
            description: "Lista de categorias",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  $ref: "#/components/schemas/Category",
                },
              },
            },
          },
        },
      },
    },
    "/product": {
      get: {
        summary: "Listagem de produtos",
        description: "Rota responsável pela listagem de produtos",
        tags: ["Produto"],
        parameters: [{}],
        security: [{ Authorization: [] }],
        responses: {
          "200": {
            description: "Lista de produtos",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Cadastro de produto",
        description: "Rota responsável pelo cadastro de produto",
        tags: ["Produto"],
        security: [{ Authorization: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Product",
              },
              examples: {
                "Cadastrar produto": {
                  value: {
                    name: "Suco de Laranja",
                    qty: 5,
                    price: 8.8,
                    categories: ["Bebidas"],
                  },
                },
              },
            },
          },
        },
        responses: {
          "401": {
            description: "Erro de validação",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
          "400": {
            description: "Falha ao cadastrar",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
          "200": {
            description: "Cadastrado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
        },
      },
    },
    "/product/{id}": {
      get: {
        summary: "Lista um produto",
        description: "Rota responsável pela listagem de um produto",
        tags: ["Produto"],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Id do produto",
            required: true,
          },
        ],
        security: [{ Authorization: [] }],
        responses: {
          "200": {
            description: "Detalhes do produtos",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
        },
      },
      patch: {
        summary: "Alteração de produto",
        description: "Rota responsável pela alteração de um produto",
        tags: ["Produto"],
        security: [{ Authorization: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Id do produto",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Product",
              },
              examples: {
                "Alterar produto": {
                  value: {
                    name: "Suco de Laranja",
                    qty: 5,
                    price: 8.8,
                    categories: ["Bebidas"],
                  },
                },
              },
            },
          },
        },
        responses: {
          "401": {
            description: "Erro de validação",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
          "400": {
            description: "Falha ao cadastrar",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
          "200": {
            description: "Cadastrado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete um produto",
        description: "Rota responsável pela remoção de um produto",
        tags: ["Produto"],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Id do produto",
            required: true,
          },
        ],
        security: [{ Authorization: [] }],
        responses: {
          "200": {
            description: "Deleta um produto",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  $ref: "#/components/schemas/Response",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Login: {
        type: "object",
        properties: {
          login: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      LoginResponse: {
        type: "object",
        properties: {
          token: {
            type: "string",
          },
          message: {
            type: "string",
          },
          error: {
            type: "boolean",
          },
        },
      },
      Response: {
        type: "object",
        properties: {
          auth: {
            type: "boolean",
          },
          error: {
            type: "boolean",
          },
          message: {
            type: "string",
          },
        },
      },
      Category: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          parent: {
            type: "array",
            items: { type: "string" },
          },
        },
      },
      Product: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          categories: {
            type: "array",
            items: { type: "string" },
          },
          qty: {
            type: "number",
          },
          price: {
            type: "number",
          },
        },
      },
      CategoryResponse: {
        type: "object",
        properties: {
          error: {
            type: "boolean",
          },
          categories: {
            type: "array",
            items: {
              type: "object",
              $ref: "#/components/schemas/Category",
            },
          },
        },
      },
      ProductResponse: {
        type: "object",
        properties: {
          error: {
            type: "boolean",
          },
          product: {
            type: "array",
            items: {
              type: "object",
              $ref: "#/components/schemas/Product",
            },
          },
        },
      },
    },
    securitySchemes: {
      Authorization: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        value: "<JWT>",
      },
    },
  },
};

export default swaggerDocument;
