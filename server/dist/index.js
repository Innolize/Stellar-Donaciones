"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const inversify_1 = __importDefault(require("./config/inversify"));
const module_1 = require("./module/user/module");
const module_2 = require("./module/auth/module");
const module_3 = require("./module/organization/module");
const module_4 = require("./module/organization/module");
const module_5 = require("./module/transaction/module");
const http_status_codes_1 = require("http-status-codes");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const strategies_1 = require("./module/auth/strategies");
const app = (0, express_1.default)();
app.use(passport_1.default.initialize());
(0, strategies_1.configurePassportStrategies)(inversify_1.default, passport_1.default);
app.use((0, cors_1.default)({ credentials: true, origin: process.env.ORIGIN_API_CONSUMER }));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
(0, module_1.init)(app, inversify_1.default);
(0, module_2.init)(app, inversify_1.default);
(0, module_3.init)(app, inversify_1.default);
(0, module_4.init)(app, inversify_1.default);
(0, module_5.init)(app, inversify_1.default);
const PORT = process.env.PORT || 8000;
//si encuentra algun error imprevisto
app.use((err, req, res, next) => {
    console.log(err);
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
});
//si no encuentre ruta
app.use(function (req, res, next) {
    const method = req.method;
    const route = req.originalUrl;
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({
        "method": method,
        "route": route,
        'error': "Route not found"
    });
});
app.listen(PORT, () => console.log(`escuchando en http://localhost:${PORT}/`));
