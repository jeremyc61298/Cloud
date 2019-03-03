"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// app/index.ts
// Jeremy Campbell
// Main application for Cloud-HU
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const exphbs = __importStar(require("express-handlebars"));
const config = __importStar(require("../config"));
const routes_1 = require("./cloud/routes");
const common_1 = require("./common");
exports.app = express_1.default();
// Associate templates with handlebars files with ".hd" extension
const hbsEngine = exphbs.create({ extname: ".hb" }).engine;
exports.app.engine("hb", hbsEngine);
// Look in the 'templates' directory for templates
exports.app.set('views', process.cwd() + '/templates');
// Logging 
exports.app.use(morgan_1.default(config.logType));
exports.app.use(express_1.default.static("./static"));
exports.app.use(routes_1.router);
exports.app.use(common_1.defaultNotFound);
//# sourceMappingURL=index.js.map