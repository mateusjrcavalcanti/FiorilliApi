"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var transparencia_1 = require("./transparencia");
var prisma = new client_1.PrismaClient();
var update = function () { return __awaiter(void 0, void 0, void 0, function () {
    var anos, anoAtual, mesAtual, _a, anos_1, anos_1_1, ano, e_1_1;
    var _b, e_1, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0: return [4 /*yield*/, prisma.ano.findMany({
                    include: {
                        entidadeName: {
                            include: {
                                entidade: {
                                    include: { portal: true },
                                },
                            },
                        },
                    },
                })];
            case 1:
                anos = _e.sent();
                anoAtual = new Date().getFullYear();
                mesAtual = new Date().getMonth() + 1;
                _e.label = 2;
            case 2:
                _e.trys.push([2, 14, 15, 20]);
                _a = true, anos_1 = __asyncValues(anos);
                _e.label = 3;
            case 3: return [4 /*yield*/, anos_1.next()];
            case 4:
                if (!(anos_1_1 = _e.sent(), _b = anos_1_1.done, !_b)) return [3 /*break*/, 13];
                _d = anos_1_1.value;
                _a = false;
                _e.label = 5;
            case 5:
                _e.trys.push([5, , 11, 12]);
                ano = _d;
                if (!(Number(ano.ano) == anoAtual ||
                    (Number(ano.ano) == anoAtual - 1 && mesAtual == 1))) return [3 /*break*/, 10];
                return [4 /*yield*/, (0, transparencia_1.receitas)({ ano: ano, workers: 4 })];
            case 6:
                _e.sent();
                return [4 /*yield*/, (0, transparencia_1.despesasExtras)({ ano: ano, workers: 4 })];
            case 7:
                _e.sent();
                return [4 /*yield*/, (0, transparencia_1.transferencias)({ ano: ano, workers: 4 })];
            case 8:
                _e.sent();
                return [4 /*yield*/, (0, transparencia_1.despesasGerais)({
                        ano: ano,
                        workers: 4,
                    })];
            case 9:
                _e.sent();
                _e.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                _a = true;
                return [7 /*endfinally*/];
            case 12: return [3 /*break*/, 3];
            case 13: return [3 /*break*/, 20];
            case 14:
                e_1_1 = _e.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 20];
            case 15:
                _e.trys.push([15, , 18, 19]);
                if (!(!_a && !_b && (_c = anos_1.return))) return [3 /*break*/, 17];
                return [4 /*yield*/, _c.call(anos_1)];
            case 16:
                _e.sent();
                _e.label = 17;
            case 17: return [3 /*break*/, 19];
            case 18:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 19: return [7 /*endfinally*/];
            case 20: return [2 /*return*/];
        }
    });
}); };
exports.default = update;
//# sourceMappingURL=index.js.map