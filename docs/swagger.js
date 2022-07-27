const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

exports.merge = (app) => {
    // Swagger route
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
