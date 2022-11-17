const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

module.exports = {
  initializeSwagger: (app) => {
    const options = {
      explorer: true,
      swaggerOptions: {
        authAction: {
          JWT: {
            name: "JWT",
            schema: {
              type: "apiKey",
              in: "header",
              name: "Authorization",
              description: "",
            },
            value: "Bearer <JWT>",
          },
        },
      },
    };

    const swaggerDefinition = {
      openapi: "3.0.0",
      info: {
        title: "Express API for JWT Firebase Token validator",
        version: "1.0.0",
        description:
          "This is a REST API application made with Express. It verify a JWT firebase token.",
        contact: {
          name: "Firebase JWT Token validator",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Development server",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    };

    const swaggerDocs = swaggerJsDoc({
      swaggerDefinition,
      apis: ["./index.js"],
    });
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs, options));
  },
};
