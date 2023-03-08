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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const query_1 = require("./query");
const app = (0, express_1.default)();
const port = 8080;
const baseURL = "http://170.78.48.18:8079/Transparencia/VersaoJson/";
const empresa = "6";
const instance = axios_1.default.create({
    baseURL,
    timeout: 5000,
    withCredentials: true,
    //headers: { "X-Custom-Header": "foobar" },
});
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.get("/despesas/:inicio/:fim/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inicio = new Date(Date.parse(req.params.inicio));
    const fim = new Date(Date.parse(req.params.fim));
    const data = yield (0, query_1.execQuery)({
        instance,
        url: {
            categoria: "Despesas",
            listagem: "DespesasGerais",
            rest: "&MostrarFornecedor=True&UFParaFiltroCOVID=&MostrarCNPJFornecedor=True&ApenasIDEmpenho=False",
        },
        empresa,
        inicio,
        fim,
    });
    res.json(data);
}));
app.get("/despesas/:numero/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, query_1.DetalhesEmpenhoPorNumeroEmpenho)({
        instance,
        numero: req.params.numero,
    });
    res.json(data);
}));
app.get("/diarias/:inicio/:fim/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inicio = new Date(Date.parse(req.params.inicio));
    const fim = new Date(Date.parse(req.params.fim));
    const data = yield (0, query_1.execQuery)({
        instance,
        url: {
            categoria: "Despesas",
            listagem: "Diarias",
        },
        empresa,
        inicio,
        fim,
    });
    res.json(data);
}));
app.get("/receitas/:inicio/:fim/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inicio = new Date(Date.parse(req.params.inicio));
    const fim = new Date(Date.parse(req.params.fim));
    const data = yield (0, query_1.execQuery)({
        instance,
        url: {
            categoria: "Receitas",
            listagem: "ReceitaExtraOrcamentaria",
        },
        empresa,
        inicio,
        fim,
    });
    res.json(data);
}));
app.get("/transferencias/:inicio/:fim/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inicio = new Date(Date.parse(req.params.inicio));
    const fim = new Date(Date.parse(req.params.fim));
    const data = yield (0, query_1.execQuery)({
        instance,
        url: {
            categoria: "Transferencias",
            listagem: "Transf",
        },
        empresa,
        inicio,
        fim,
    });
    res.json(data);
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
