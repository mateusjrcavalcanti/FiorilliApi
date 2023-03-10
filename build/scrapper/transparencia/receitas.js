"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.receitas = void 0;
var client_1 = require("@prisma/client");
var puppeteer_1 = __importDefault(require("puppeteer"));
var utils_1 = require("./utils");
var args_1 = __importDefault(require("./utils/args"));
var prisma = new client_1.PrismaClient();
function receitas(_a) {
    var workers = _a.workers, ano = _a.ano;
    return __awaiter(this, void 0, void 0, function () {
        var exercicio, entidade, url, browser, context, receitas, retorno;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    exercicio = "".concat(ano.ano);
                    entidade = "".concat(ano.entidadeName.name);
                    url = ano.entidadeName.entidade.portal.url;
                    return [4 /*yield*/, puppeteer_1.default.launch(args_1.default)];
                case 1:
                    browser = _b.sent();
                    return [4 /*yield*/, browser.createIncognitoBrowserContext()];
                case 2:
                    context = _b.sent();
                    return [4 /*yield*/, getAllReceitas(exercicio, entidade, url, context)];
                case 3:
                    receitas = _b.sent();
                    return [4 /*yield*/, saveReceitas({ ano: ano, receitas: receitas })];
                case 4:
                    retorno = _b.sent();
                    console.log("Inserido no banco: ".concat(retorno.length, " registros"));
                    return [4 /*yield*/, browser.close()];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.receitas = receitas;
function getAllReceitas(exercicio, entidade, url, context) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var page, client, colunas, todasLinhas, linhas, data, _d, _e, _f, linha, e_1_1;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, context.newPage()];
                case 1:
                    page = _g.sent();
                    return [4 /*yield*/, page.target().createCDPSession()];
                case 2:
                    client = _g.sent();
                    return [4 /*yield*/, client.send('Network.clearBrowserCookies')];
                case 3:
                    _g.sent();
                    return [4 /*yield*/, client.send('Network.clearBrowserCache')];
                case 4:
                    _g.sent();
                    return [4 /*yield*/, page.goto(url)];
                case 5:
                    _g.sent();
                    return [4 /*yield*/, (0, utils_1.defExercicio)(page, exercicio)];
                case 6:
                    _g.sent();
                    return [4 /*yield*/, (0, utils_1.defEntidade)(page, entidade)];
                case 7:
                    _g.sent();
                    return [4 /*yield*/, (0, utils_1.goPage)(page, url, 'lnkReceitaExtraOrcamentaria')];
                case 8:
                    _g.sent();
                    return [4 /*yield*/, (0, utils_1.removeDadosConsolidados)(page, url, 'lnkReceitaExtraOrcamentaria')];
                case 9:
                    _g.sent();
                    return [4 /*yield*/, (0, utils_1.getColuns)(page, 'gridReceitas')];
                case 10:
                    colunas = _g.sent();
                    todasLinhas = [];
                    _g.label = 11;
                case 11: return [4 /*yield*/, page.evaluate(function () { return eval('AtualizarGrid()'); })];
                case 12:
                    _g.sent();
                    return [4 /*yield*/, (0, utils_1.waitResponse)(page, 'ReceitasPorEntidade.aspx')];
                case 13:
                    _g.sent();
                    return [4 /*yield*/, page.$$eval("#gridReceitas_DXMainTable > tbody > tr.dxgvDataRow", function (elements) {
                            var linhas = [];
                            elements.map(function (el) {
                                var linha = [];
                                Array.from(el.children).map(function (col) { return linha.push(col.innerText); });
                                linhas.push(linha);
                            });
                            return linhas;
                        })];
                case 14:
                    linhas = _g.sent();
                    if (linhas.length)
                        todasLinhas.push.apply(todasLinhas, linhas);
                    return [4 /*yield*/, page.evaluate(function () {
                            return eval("aspxGVPagerOnClick('gridReceitas','PBN');");
                        })];
                case 15:
                    _g.sent();
                    _g.label = 16;
                case 16: return [4 /*yield*/, page.evaluate(function () { return document.querySelectorAll('img.dxWeb_pNext').length; })];
                case 17:
                    if (_g.sent()) return [3 /*break*/, 11];
                    _g.label = 18;
                case 18: return [4 /*yield*/, (0, utils_1.getData)(colunas, todasLinhas)];
                case 19:
                    data = _g.sent();
                    _g.label = 20;
                case 20:
                    _g.trys.push([20, 26, 27, 32]);
                    _d = true;
                    return [4 /*yield*/, data];
                case 21:
                    _e = __asyncValues.apply(void 0, [_g.sent()]);
                    _g.label = 22;
                case 22: return [4 /*yield*/, _e.next()];
                case 23:
                    if (!(_f = _g.sent(), _a = _f.done, !_a)) return [3 /*break*/, 25];
                    _c = _f.value;
                    _d = false;
                    try {
                        linha = _c;
                        linha.Exercicio = linha.Data.split('/')[2];
                    }
                    finally {
                        _d = true;
                    }
                    _g.label = 24;
                case 24: return [3 /*break*/, 22];
                case 25: return [3 /*break*/, 32];
                case 26:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 32];
                case 27:
                    _g.trys.push([27, , 30, 31]);
                    if (!(!_d && !_a && (_b = _e.return))) return [3 /*break*/, 29];
                    return [4 /*yield*/, _b.call(_e)];
                case 28:
                    _g.sent();
                    _g.label = 29;
                case 29: return [3 /*break*/, 31];
                case 30:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 31: return [7 /*endfinally*/];
                case 32: return [2 /*return*/, data];
            }
        });
    });
}
exports.default = getAllReceitas;
function saveReceitas(_a) {
    var _b, receitas_1, receitas_1_1, _c, receitas_2, receitas_2_1;
    var _d, e_2, _e, _f, _g, e_3, _h, _j;
    var ano = _a.ano, receitas = _a.receitas;
    return __awaiter(this, void 0, void 0, function () {
        var result, receita, e_2_1, receita, e_3_1;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    result = [];
                    _k.label = 1;
                case 1:
                    _k.trys.push([1, 9, 10, 15]);
                    _b = true, receitas_1 = __asyncValues(receitas);
                    _k.label = 2;
                case 2: return [4 /*yield*/, receitas_1.next()];
                case 3:
                    if (!(receitas_1_1 = _k.sent(), _d = receitas_1_1.done, !_d)) return [3 /*break*/, 8];
                    _f = receitas_1_1.value;
                    _b = false;
                    _k.label = 4;
                case 4:
                    _k.trys.push([4, , 6, 7]);
                    receita = _f;
                    return [4 /*yield*/, (0, utils_1.tratamento)(receita)];
                case 5:
                    _k.sent();
                    return [3 /*break*/, 7];
                case 6:
                    _b = true;
                    return [7 /*endfinally*/];
                case 7: return [3 /*break*/, 2];
                case 8: return [3 /*break*/, 15];
                case 9:
                    e_2_1 = _k.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 15];
                case 10:
                    _k.trys.push([10, , 13, 14]);
                    if (!(!_b && !_d && (_e = receitas_1.return))) return [3 /*break*/, 12];
                    return [4 /*yield*/, _e.call(receitas_1)];
                case 11:
                    _k.sent();
                    _k.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 14: return [7 /*endfinally*/];
                case 15:
                    _k.trys.push([15, 23, 24, 29]);
                    _c = true, receitas_2 = __asyncValues(receitas);
                    _k.label = 16;
                case 16: return [4 /*yield*/, receitas_2.next()];
                case 17:
                    if (!(receitas_2_1 = _k.sent(), _g = receitas_2_1.done, !_g)) return [3 /*break*/, 22];
                    _j = receitas_2_1.value;
                    _c = false;
                    _k.label = 18;
                case 18:
                    _k.trys.push([18, , 20, 21]);
                    receita = _j;
                    return [4 /*yield*/, prisma.receita.upsert({
                            where: {
                                Extra_Data: {
                                    Extra: receita.Extra,
                                    Data: receita.Data,
                                },
                            },
                            update: __assign({}, receita),
                            create: __assign({ anoId: ano === null || ano === void 0 ? void 0 : ano.id }, receita),
                        })];
                case 19:
                    _k.sent();
                    result.push({ receita: receita });
                    return [3 /*break*/, 21];
                case 20:
                    _c = true;
                    return [7 /*endfinally*/];
                case 21: return [3 /*break*/, 16];
                case 22: return [3 /*break*/, 29];
                case 23:
                    e_3_1 = _k.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 29];
                case 24:
                    _k.trys.push([24, , 27, 28]);
                    if (!(!_c && !_g && (_h = receitas_2.return))) return [3 /*break*/, 26];
                    return [4 /*yield*/, _h.call(receitas_2)];
                case 25:
                    _k.sent();
                    _k.label = 26;
                case 26: return [3 /*break*/, 28];
                case 27:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 28: return [7 /*endfinally*/];
                case 29: return [2 /*return*/, result];
            }
        });
    });
}
//# sourceMappingURL=receitas.js.map