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
exports.delay = void 0;
var puppeteer_1 = __importDefault(require("puppeteer"));
function getDespesa(_a) {
    var baseURL = _a.baseURL, exercicio = _a.exercicio, numero = _a.numero;
    return __awaiter(this, void 0, void 0, function () {
        var entidade, browser, context, page, anoElement, anoAtual, entidadeElement, entidadeAtual, teste, numEmpenhoElement, empenho;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    entidade = exercicio > 2022
                        ? "CAMARA MUNICIPAL DE DORMENTES - PE"
                        : "CAMARA MUNICIPAL DE DORMENTES";
                    return [4 /*yield*/, puppeteer_1.default.launch({
                            headless: true,
                            defaultViewport: null,
                            ignoreHTTPSErrors: true,
                            args: [
                                "--disable-web-security",
                                "--enable-feature=NetworkService",
                                "--disable-features=IsolateOrigins,site-per-process",
                                "--disable-gpu",
                                "--disable-dev-shm-usage",
                                "--disable-setuid-sandbox",
                                "--no-sandbox",
                            ],
                        })];
                case 1:
                    browser = _b.sent();
                    return [4 /*yield*/, browser.createIncognitoBrowserContext()];
                case 2:
                    context = _b.sent();
                    return [4 /*yield*/, context.newPage()];
                case 3:
                    page = _b.sent();
                    return [4 /*yield*/, page.goto(baseURL)];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, page.waitForSelector("input[name=cmbExercicio]")];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, page.$("input[name=cmbExercicio]")];
                case 6:
                    anoElement = _b.sent();
                    return [4 /*yield*/, page.evaluate(function (el) { return el === null || el === void 0 ? void 0 : el.value; }, anoElement)];
                case 7:
                    anoAtual = _b.sent();
                    if (!(Number(anoAtual) != exercicio)) return [3 /*break*/, 11];
                    return [4 /*yield*/, page.evaluate(function (el, exercicio) { return el.setAttribute("value", "".concat(exercicio)); }, anoElement, exercicio)];
                case 8:
                    _b.sent();
                    return [4 /*yield*/, page.evaluate(function () { return eval("aspxETextChanged('cmbExercicio')"); })];
                case 9:
                    _b.sent();
                    return [4 /*yield*/, waitResponse(page, "AtualizaTabelaPesquisaGeral")];
                case 10:
                    _b.sent();
                    console.log("Ano atualizado");
                    _b.label = 11;
                case 11: return [4 /*yield*/, page.waitForSelector("input[name=cmbEntidadeContabil]")];
                case 12:
                    _b.sent();
                    return [4 /*yield*/, page.$("input[name=cmbEntidadeContabil]")];
                case 13:
                    entidadeElement = _b.sent();
                    return [4 /*yield*/, page.evaluate(function (el) { return el === null || el === void 0 ? void 0 : el.value; }, entidadeElement)];
                case 14:
                    entidadeAtual = _b.sent();
                    if (!(entidadeAtual != entidade)) return [3 /*break*/, 18];
                    return [4 /*yield*/, page.evaluate(function (el, entidade) { return el.setAttribute("value", "".concat(entidade)); }, entidadeElement, entidade)];
                case 15:
                    _b.sent();
                    return [4 /*yield*/, page.evaluate(function () { return eval("aspxETextChanged('cmbEntidadeContabil')"); })];
                case 16:
                    _b.sent();
                    return [4 /*yield*/, waitResponse(page, "AtualizaTabelaPesquisaGeral")];
                case 17:
                    teste = _b.sent();
                    console.log("Entidade atualizada");
                    _b.label = 18;
                case 18: return [4 /*yield*/, delay(2 * 1000)];
                case 19:
                    _b.sent();
                    // Navega para os empenhos
                    return [4 /*yield*/, page.evaluate(function () {
                            return eval("ProcessaDados('lnkDespesasPor_NotaEmpenho')");
                        })];
                case 20:
                    // Navega para os empenhos
                    _b.sent();
                    return [4 /*yield*/, waitResponse(page, "RecuperarDados")];
                case 21:
                    _b.sent();
                    //page.waitForNavigation();
                    return [4 /*yield*/, page.goto("".concat(baseURL, "/DespesasPorEntidade.aspx"))];
                case 22:
                    //page.waitForNavigation();
                    _b.sent();
                    // Remove os dados consolidados
                    return [4 /*yield*/, (page === null || page === void 0 ? void 0 : page.waitForSelector("#chkMostrarDadosConsolidados"))];
                case 23:
                    // Remove os dados consolidados
                    _b.sent();
                    return [4 /*yield*/, (page === null || page === void 0 ? void 0 : page.$eval("input[name=chkMostrarDadosConsolidados]", function (e) {
                            e.removeAttribute("checked");
                            eval("AtualizarGrid()");
                        }))];
                case 24:
                    _b.sent();
                    console.log("Dados consolidados removidos");
                    return [4 /*yield*/, waitResponse(page, "DespesasPorEntidade.aspx")];
                case 25:
                    _b.sent();
                    // Procurar pelo numero do emprenho
                    return [4 /*yield*/, page.waitForSelector("input[id=gridDespesas_DXFREditorcol3_I]")];
                case 26:
                    // Procurar pelo numero do emprenho
                    _b.sent();
                    return [4 /*yield*/, page.$("input[id=gridDespesas_DXFREditorcol3_I]")];
                case 27:
                    numEmpenhoElement = _b.sent();
                    return [4 /*yield*/, page.evaluate(function (el, numero) { return el.setAttribute("value", numero); }, numEmpenhoElement, numero)];
                case 28:
                    _b.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            return eval("aspxEValueChanged('gridDespesas_DXFREditorcol3')");
                        })];
                case 29:
                    _b.sent();
                    console.log("Numero do empenho inserido");
                    return [4 /*yield*/, waitResponse(page, "DespesasPorEntidade.aspx")];
                case 30:
                    _b.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            return eval("aspxGVCommandCustomButton('gridDespesas','btnDetalhes',0)");
                        })];
                case 31:
                    _b.sent();
                    return [4 /*yield*/, waitResponse(page, "DadosEmpenho.aspx")];
                case 32:
                    _b.sent();
                    return [4 /*yield*/, getDadosEmpenho(page)];
                case 33:
                    empenho = _b.sent();
                    console.log("Dados do empenho recuperados");
                    return [4 /*yield*/, browser.close()];
                case 34:
                    _b.sent();
                    console.log("Browser fechado");
                    return [2 /*return*/, empenho];
            }
        });
    });
}
exports.default = getDespesa;
function getDadosEmpenho(page) {
    var _a, e_1, _b, _c, _d, e_2, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
        var empenho, iframe, iframeContent, campos, historico, _g, historico_1, historico_1_1, opt, e_1_1, liquidacoes, pagamentos, _loop_1, _h, campos_1, campos_1_1, e_2_1;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    empenho = {};
                    return [4 /*yield*/, page.$("#_ifrLoaderWindow")];
                case 1:
                    iframe = _j.sent();
                    return [4 /*yield*/, (iframe === null || iframe === void 0 ? void 0 : iframe.contentFrame())];
                case 2:
                    iframeContent = _j.sent();
                    return [4 /*yield*/, (iframeContent === null || iframeContent === void 0 ? void 0 : iframeContent.waitForSelector("#btnFecharDetalhe", {
                            visible: true,
                            timeout: 5000,
                        }))];
                case 3:
                    _j.sent();
                    return [4 /*yield*/, (iframeContent === null || iframeContent === void 0 ? void 0 : iframeContent.$$eval("span.LabelDadosCampo", function (elements) {
                            return elements.map(function (item) {
                                var _a;
                                return _a = {}, _a[item.id.replace("txt", "")] = item.innerText, _a;
                            });
                        }))];
                case 4:
                    campos = _j.sent();
                    return [4 /*yield*/, (iframeContent === null || iframeContent === void 0 ? void 0 : iframeContent.$$eval("span.LabelDadosHistorico", function (elements) {
                            return elements.map(function (item) {
                                if (item.id.replace("txt", "") == "Historico")
                                    return item.innerText;
                            });
                        }))];
                case 5:
                    historico = _j.sent();
                    _j.label = 6;
                case 6:
                    _j.trys.push([6, 11, 12, 17]);
                    _g = true, historico_1 = __asyncValues(historico);
                    _j.label = 7;
                case 7: return [4 /*yield*/, historico_1.next()];
                case 8:
                    if (!(historico_1_1 = _j.sent(), _a = historico_1_1.done, !_a)) return [3 /*break*/, 10];
                    _c = historico_1_1.value;
                    _g = false;
                    try {
                        opt = _c;
                        if (opt !== null)
                            empenho["Historico"] = opt;
                    }
                    finally {
                        _g = true;
                    }
                    _j.label = 9;
                case 9: return [3 /*break*/, 7];
                case 10: return [3 /*break*/, 17];
                case 11:
                    e_1_1 = _j.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 17];
                case 12:
                    _j.trys.push([12, , 15, 16]);
                    if (!(!_g && !_a && (_b = historico_1.return))) return [3 /*break*/, 14];
                    return [4 /*yield*/, _b.call(historico_1)];
                case 13:
                    _j.sent();
                    _j.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 16: return [7 /*endfinally*/];
                case 17: return [4 /*yield*/, iframeContent.$$eval("#gridParcelas_DXMainTable > tbody > tr.dxgvDataRow", function (elements) {
                        return elements.map(function (item) {
                            var itens = item.getElementsByClassName("dxgv");
                            return {
                                numero: itens[1].innerText,
                                data: itens[2].innerText,
                                valor: itens[3].innerText,
                                Vencimento: itens[4].innerText,
                            };
                        });
                    })];
                case 18:
                    liquidacoes = _j.sent();
                    return [4 /*yield*/, iframeContent.$$eval("#gridPagamentos_DXMainTable > tbody > tr.dxgvDataRow", function (elements) {
                            return elements.map(function (item) {
                                var itens = item.getElementsByClassName("dxgv");
                                return {
                                    numero: itens[0].innerText,
                                    parcela: itens[1].innerText,
                                    data: itens[2].innerText,
                                    valor: itens[3].innerText,
                                    retencao: itens[4].innerText,
                                    pago: itens[5].innerText,
                                };
                            });
                        })];
                case 19:
                    pagamentos = _j.sent();
                    _j.label = 20;
                case 20:
                    _j.trys.push([20, 25, 26, 31]);
                    _loop_1 = function () {
                        _f = campos_1_1.value;
                        _h = false;
                        try {
                            var campo = _f;
                            Object.keys(campo).forEach(function (k) {
                                empenho[k] = campo[k];
                            });
                        }
                        finally {
                            _h = true;
                        }
                    };
                    _h = true, campos_1 = __asyncValues(campos);
                    _j.label = 21;
                case 21: return [4 /*yield*/, campos_1.next()];
                case 22:
                    if (!(campos_1_1 = _j.sent(), _d = campos_1_1.done, !_d)) return [3 /*break*/, 24];
                    _loop_1();
                    _j.label = 23;
                case 23: return [3 /*break*/, 21];
                case 24: return [3 /*break*/, 31];
                case 25:
                    e_2_1 = _j.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 31];
                case 26:
                    _j.trys.push([26, , 29, 30]);
                    if (!(!_h && !_d && (_e = campos_1.return))) return [3 /*break*/, 28];
                    return [4 /*yield*/, _e.call(campos_1)];
                case 27:
                    _j.sent();
                    _j.label = 28;
                case 28: return [3 /*break*/, 30];
                case 29:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 30: return [7 /*endfinally*/];
                case 31:
                    //await iframeContent?.evaluate(() => eval(`FecharDetalhes()`));
                    empenho = __assign(__assign({}, empenho), { liquidacoes: liquidacoes, pagamentos: pagamentos });
                    return [2 /*return*/, empenho];
            }
        });
    });
}
function getDadosEmpenhoFromList(page) {
    return __awaiter(this, void 0, void 0, function () {
        var empenhos, sumarioElement, sumario, i, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    empenhos = [];
                    return [4 /*yield*/, (page === null || page === void 0 ? void 0 : page.waitForSelector("#gridDespesasEmpenhos_DXMainTable", {
                            setTimeout: 5000,
                        }))];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, page.$("td.dxpSummary")];
                case 2:
                    sumarioElement = _c.sent();
                    return [4 /*yield*/, page.evaluate(function (el) { return el.textContent; }, sumarioElement)];
                case 3:
                    sumario = _c.sent();
                    sumario = sumario.match(/(Total de linhas - )([\d\w\.]+)/)[2];
                    i = 0;
                    _c.label = 4;
                case 4:
                    if (!(i < sumario)) return [3 /*break*/, 9];
                    return [4 /*yield*/, page.evaluate(function (i) {
                            return eval("aspxGVCommandCustomButton('gridDespesasEmpenhos','btnDetalhes',".concat(i, ")"));
                        }, i)];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, waitResponse(page, "DadosEmpenho.aspx")];
                case 6:
                    _c.sent();
                    _b = (_a = empenhos).push;
                    return [4 /*yield*/, getDadosEmpenho(page)];
                case 7:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 8;
                case 8:
                    i++;
                    return [3 /*break*/, 4];
                case 9: return [4 /*yield*/, (page === null || page === void 0 ? void 0 : page.evaluate(function () { return eval("VoltarDespesas()"); }))];
                case 10:
                    _c.sent();
                    return [4 /*yield*/, (page === null || page === void 0 ? void 0 : page.waitForSelector("#chkMostrarDadosConsolidados", {
                            timeout: 5000,
                        }))];
                case 11:
                    _c.sent();
                    return [2 /*return*/, empenhos];
            }
        });
    });
}
function waitResponse(page, url) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.waitForResponse(function (response) { return response.url().includes(url) && response.status() == 200; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
exports.delay = delay;
