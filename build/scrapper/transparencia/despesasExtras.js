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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.despesasExtras = void 0;
var client_1 = require("@prisma/client");
var puppeteer_1 = __importDefault(require("puppeteer"));
var utils_1 = require("./utils");
var args_1 = __importDefault(require("./utils/args"));
var prisma = new client_1.PrismaClient();
function despesasExtras(_a) {
    var workers = _a.workers, ano = _a.ano;
    return __awaiter(this, void 0, void 0, function () {
        var exercicio, entidade, url, browser, context, empenhos, retorno;
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
                    return [4 /*yield*/, getAllExtra(exercicio, entidade, url, context)];
                case 3:
                    empenhos = _b.sent();
                    return [4 /*yield*/, saveDespesasExtras({ ano: ano, empenhos: empenhos })];
                case 4:
                    retorno = _b.sent();
                    console.log("Inserido no banco: ".concat(retorno.empenhos.length, " registros"));
                    return [4 /*yield*/, browser.close()];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.despesasExtras = despesasExtras;
function getAllExtra(exercicio, entidade, url, context) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var page, client, empenhos, links, _d, links_1, links_1_1, link, _e, _f, e_1_1;
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
                    return [4 /*yield*/, (0, utils_1.goPage)(page, url, 'lnkDespesasPor_ExtraOrcamentaria')];
                case 8:
                    _g.sent();
                    return [4 /*yield*/, (0, utils_1.removeDadosConsolidados)(page, url, 'lnkDespesasPor_ExtraOrcamentaria')];
                case 9:
                    _g.sent();
                    empenhos = [];
                    _g.label = 10;
                case 10:
                    if (!1) return [3 /*break*/, 39];
                    return [4 /*yield*/, page.waitForSelector('td.CSS_lnkValor_ASPx')];
                case 11:
                    _g.sent();
                    return [4 /*yield*/, page.$$eval('#gridDespesas_DXMainTable > tbody > tr.dxgvDataRow > td.CSS_lnkValor_ASPx', function (e) { return e.map(function (a) { return a.getAttribute('onclick'); }); })];
                case 12:
                    links = _g.sent();
                    _g.label = 13;
                case 13:
                    _g.trys.push([13, 27, 28, 33]);
                    _d = true, links_1 = (e_1 = void 0, __asyncValues(links));
                    _g.label = 14;
                case 14: return [4 /*yield*/, links_1.next()];
                case 15:
                    if (!(links_1_1 = _g.sent(), _a = links_1_1.done, !_a)) return [3 /*break*/, 26];
                    _c = links_1_1.value;
                    _d = false;
                    _g.label = 16;
                case 16:
                    _g.trys.push([16, , 24, 25]);
                    link = _c;
                    return [4 /*yield*/, page.evaluate(function (link) { return eval(link); }, link)];
                case 17:
                    _g.sent();
                    return [4 /*yield*/, (0, utils_1.waitResponse)(page, 'RecuperarListaEmpenhos')];
                case 18:
                    _g.sent();
                    return [4 /*yield*/, (page === null || page === void 0 ? void 0 : page.waitForSelector('#btnVoltarDespesas', {
                            visible: true,
                            timeout: 15000,
                        }))];
                case 19:
                    _g.sent();
                    _f = (_e = empenhos).concat;
                    return [4 /*yield*/, (0, utils_1.getDadosEmpenhoFromList)(page)];
                case 20:
                    //await delay(10 * 1000);
                    empenhos = _f.apply(_e, [_g.sent()]);
                    return [4 /*yield*/, (page === null || page === void 0 ? void 0 : page.evaluate(function () {
                            return eval("javascript:__doPostBack('btnVoltarDespesas','')");
                        }))];
                case 21:
                    _g.sent();
                    return [4 /*yield*/, (0, utils_1.waitResponse)(page, 'DespesasPorEntidade.aspx')];
                case 22:
                    _g.sent();
                    return [4 /*yield*/, (page === null || page === void 0 ? void 0 : page.waitForSelector('#chkMostrarDadosConsolidados', {
                            timeout: 5000,
                        }))];
                case 23:
                    _g.sent();
                    return [3 /*break*/, 25];
                case 24:
                    _d = true;
                    return [7 /*endfinally*/];
                case 25: return [3 /*break*/, 14];
                case 26: return [3 /*break*/, 33];
                case 27:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 33];
                case 28:
                    _g.trys.push([28, , 31, 32]);
                    if (!(!_d && !_a && (_b = links_1.return))) return [3 /*break*/, 30];
                    return [4 /*yield*/, _b.call(links_1)];
                case 29:
                    _g.sent();
                    _g.label = 30;
                case 30: return [3 /*break*/, 32];
                case 31:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 32: return [7 /*endfinally*/];
                case 33: return [4 /*yield*/, page.evaluate(function () { return document.querySelectorAll('img.dxWeb_pNext').length; })];
                case 34:
                    if (!_g.sent()) return [3 /*break*/, 37];
                    return [4 /*yield*/, page.evaluate(function () {
                            return eval("aspxGVPagerOnClick('gridDespesas','PBN')");
                        })];
                case 35:
                    _g.sent();
                    return [4 /*yield*/, (0, utils_1.waitResponse)(page, 'DespesasPorEntidade.aspx')];
                case 36:
                    _g.sent();
                    return [3 /*break*/, 38];
                case 37: return [3 /*break*/, 39];
                case 38: return [3 /*break*/, 10];
                case 39: return [2 /*return*/, empenhos];
            }
        });
    });
}
exports.default = getAllExtra;
function saveDespesasExtras(_a) {
    var _b, empenhos_1, empenhos_1_1, _c, empenhos_2, empenhos_2_1;
    var _d, e_2, _e, _f, _g, e_3, _h, _j, _k, e_4, _l, _m, _o, e_5, _p, _q;
    var ano = _a.ano, empenhos = _a.empenhos;
    return __awaiter(this, void 0, void 0, function () {
        var result, empenho, e_2_1, _r, liquidacoes, pagamentos, empenho, dbempenho, _s, liquidacoes_1, liquidacoes_1_1, liquidacao, e_4_1, _t, pagamentos_1, pagamentos_1_1, pagamento, e_5_1, e_3_1;
        return __generator(this, function (_u) {
            switch (_u.label) {
                case 0:
                    result = [];
                    _u.label = 1;
                case 1:
                    _u.trys.push([1, 9, 10, 15]);
                    _b = true, empenhos_1 = __asyncValues(empenhos);
                    _u.label = 2;
                case 2: return [4 /*yield*/, empenhos_1.next()];
                case 3:
                    if (!(empenhos_1_1 = _u.sent(), _d = empenhos_1_1.done, !_d)) return [3 /*break*/, 8];
                    _f = empenhos_1_1.value;
                    _b = false;
                    _u.label = 4;
                case 4:
                    _u.trys.push([4, , 6, 7]);
                    empenho = _f;
                    return [4 /*yield*/, (0, utils_1.tratamento)(empenho)];
                case 5:
                    _u.sent();
                    return [3 /*break*/, 7];
                case 6:
                    _b = true;
                    return [7 /*endfinally*/];
                case 7: return [3 /*break*/, 2];
                case 8: return [3 /*break*/, 15];
                case 9:
                    e_2_1 = _u.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 15];
                case 10:
                    _u.trys.push([10, , 13, 14]);
                    if (!(!_b && !_d && (_e = empenhos_1.return))) return [3 /*break*/, 12];
                    return [4 /*yield*/, _e.call(empenhos_1)];
                case 11:
                    _u.sent();
                    _u.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 14: return [7 /*endfinally*/];
                case 15:
                    _u.trys.push([15, 52, 53, 58]);
                    _c = true, empenhos_2 = __asyncValues(empenhos);
                    _u.label = 16;
                case 16: return [4 /*yield*/, empenhos_2.next()];
                case 17:
                    if (!(empenhos_2_1 = _u.sent(), _g = empenhos_2_1.done, !_g)) return [3 /*break*/, 51];
                    _j = empenhos_2_1.value;
                    _c = false;
                    _u.label = 18;
                case 18:
                    _u.trys.push([18, , 49, 50]);
                    _r = _j;
                    liquidacoes = _r.liquidacoes, pagamentos = _r.pagamentos, empenho = __rest(_r, ["liquidacoes", "pagamentos"]);
                    return [4 /*yield*/, prisma.empenho.upsert({
                            where: {
                                anoId_Numero: {
                                    anoId: ano === null || ano === void 0 ? void 0 : ano.id,
                                    Numero: empenho.Numero,
                                },
                            },
                            update: __assign({}, empenho),
                            create: __assign({ anoId: ano === null || ano === void 0 ? void 0 : ano.id }, empenho),
                        })];
                case 19:
                    dbempenho = _u.sent();
                    _u.label = 20;
                case 20:
                    _u.trys.push([20, 28, 29, 34]);
                    _s = true, liquidacoes_1 = (e_4 = void 0, __asyncValues(liquidacoes));
                    _u.label = 21;
                case 21: return [4 /*yield*/, liquidacoes_1.next()];
                case 22:
                    if (!(liquidacoes_1_1 = _u.sent(), _k = liquidacoes_1_1.done, !_k)) return [3 /*break*/, 27];
                    _m = liquidacoes_1_1.value;
                    _s = false;
                    _u.label = 23;
                case 23:
                    _u.trys.push([23, , 25, 26]);
                    liquidacao = _m;
                    return [4 /*yield*/, prisma.liquidacao.upsert({
                            where: {
                                numero_epenhoId: {
                                    numero: liquidacao.numero,
                                    epenhoId: dbempenho.id,
                                },
                            },
                            update: __assign({}, liquidacao),
                            create: __assign({ epenhoId: dbempenho.id }, liquidacao),
                        })];
                case 24:
                    _u.sent();
                    return [3 /*break*/, 26];
                case 25:
                    _s = true;
                    return [7 /*endfinally*/];
                case 26: return [3 /*break*/, 21];
                case 27: return [3 /*break*/, 34];
                case 28:
                    e_4_1 = _u.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 34];
                case 29:
                    _u.trys.push([29, , 32, 33]);
                    if (!(!_s && !_k && (_l = liquidacoes_1.return))) return [3 /*break*/, 31];
                    return [4 /*yield*/, _l.call(liquidacoes_1)];
                case 30:
                    _u.sent();
                    _u.label = 31;
                case 31: return [3 /*break*/, 33];
                case 32:
                    if (e_4) throw e_4.error;
                    return [7 /*endfinally*/];
                case 33: return [7 /*endfinally*/];
                case 34:
                    _u.trys.push([34, 42, 43, 48]);
                    _t = true, pagamentos_1 = (e_5 = void 0, __asyncValues(pagamentos));
                    _u.label = 35;
                case 35: return [4 /*yield*/, pagamentos_1.next()];
                case 36:
                    if (!(pagamentos_1_1 = _u.sent(), _o = pagamentos_1_1.done, !_o)) return [3 /*break*/, 41];
                    _q = pagamentos_1_1.value;
                    _t = false;
                    _u.label = 37;
                case 37:
                    _u.trys.push([37, , 39, 40]);
                    pagamento = _q;
                    return [4 /*yield*/, prisma.pagamento.upsert({
                            where: {
                                numero_epenhoId: {
                                    numero: pagamento.numero,
                                    epenhoId: dbempenho.id,
                                },
                            },
                            update: __assign({}, pagamento),
                            create: __assign({ epenhoId: dbempenho.id }, pagamento),
                        })];
                case 38:
                    _u.sent();
                    return [3 /*break*/, 40];
                case 39:
                    _t = true;
                    return [7 /*endfinally*/];
                case 40: return [3 /*break*/, 35];
                case 41: return [3 /*break*/, 48];
                case 42:
                    e_5_1 = _u.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 48];
                case 43:
                    _u.trys.push([43, , 46, 47]);
                    if (!(!_t && !_o && (_p = pagamentos_1.return))) return [3 /*break*/, 45];
                    return [4 /*yield*/, _p.call(pagamentos_1)];
                case 44:
                    _u.sent();
                    _u.label = 45;
                case 45: return [3 /*break*/, 47];
                case 46:
                    if (e_5) throw e_5.error;
                    return [7 /*endfinally*/];
                case 47: return [7 /*endfinally*/];
                case 48:
                    result.push({ empenho: empenho });
                    return [3 /*break*/, 50];
                case 49:
                    _c = true;
                    return [7 /*endfinally*/];
                case 50: return [3 /*break*/, 16];
                case 51: return [3 /*break*/, 58];
                case 52:
                    e_3_1 = _u.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 58];
                case 53:
                    _u.trys.push([53, , 56, 57]);
                    if (!(!_c && !_g && (_h = empenhos_2.return))) return [3 /*break*/, 55];
                    return [4 /*yield*/, _h.call(empenhos_2)];
                case 54:
                    _u.sent();
                    _u.label = 55;
                case 55: return [3 /*break*/, 57];
                case 56:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 57: return [7 /*endfinally*/];
                case 58: return [2 /*return*/, { empenhos: empenhos }];
            }
        });
    });
}
//# sourceMappingURL=despesasExtras.js.map