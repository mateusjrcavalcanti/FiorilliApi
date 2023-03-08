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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetalhesEmpenhoPorNumeroEmpenho = exports.execQuery = exports.abstractQuery = void 0;
function abstractQuery({ url, instance, exercicio, empresa, inicio, fim, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const reqURL = `${url.categoria}/?Listagem=${url.listagem}&DiaInicioPeriodo=${inicio.dia}&Empresa=${empresa}&MesInicialPeriodo=${inicio.mes}&DiaFinalPeriodo=${fim.dia}&MesFinalPeriodo=${fim.mes}&Exercicio=${exercicio}&MostraDadosConsolidado=False${url.rest ? url.rest : ""}`;
        const { headers } = yield instance.get(`${url.categoria}/?Listagem=DefineExercicio&ConectarExercicio=${exercicio}`, {
            withCredentials: true,
        });
        const { data } = yield instance.get(reqURL, {
            withCredentials: true,
            headers: {
                Cookie: headers["set-cookie"] ? headers["set-cookie"][0] : "",
            },
        });
        return data;
    });
}
exports.abstractQuery = abstractQuery;
function execQuery({ instance, url, empresa, inicio, fim, }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (inicio.getFullYear() === fim.getFullYear()) {
            return yield abstractQuery({
                instance,
                url,
                exercicio: inicio.getFullYear(),
                empresa,
                inicio: { dia: inicio.getDate(), mes: inicio.getMonth() + 1 },
                fim: { dia: fim.getDate(), mes: fim.getMonth() + 1 },
            });
        }
        else if (inicio > fim) {
            return yield abstractQuery({
                instance,
                url,
                exercicio: inicio.getFullYear(),
                empresa,
                inicio: { dia: inicio.getDate(), mes: inicio.getMonth() + 1 },
                fim: { dia: 31, mes: 12 },
            });
        }
        else {
            const data1 = yield abstractQuery({
                instance,
                url,
                exercicio: inicio.getFullYear(),
                empresa,
                inicio: { dia: inicio.getDate(), mes: inicio.getMonth() + 1 },
                fim: { dia: 31, mes: 12 },
            });
            const data2 = yield abstractQuery({
                instance,
                url,
                exercicio: fim.getFullYear(),
                empresa,
                inicio: { dia: 1, mes: 1 },
                fim: { dia: fim.getDate(), mes: fim.getMonth() + 1 },
            });
            return [...data1, ...data2];
        }
    });
}
exports.execQuery = execQuery;
function DetalhesEmpenhoPorNumeroEmpenho({ instance, numero, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const reqURL = `/Despesas/?Listagem=DetalhesEmpenhoPorNumeroEmpenho&intNumeroEmpenho=${numero}&strTipoEmpenho=OR&bolMostrarFornecedor=True`;
        const { data } = yield instance.get(reqURL);
        return data;
    });
}
exports.DetalhesEmpenhoPorNumeroEmpenho = DetalhesEmpenhoPorNumeroEmpenho;
