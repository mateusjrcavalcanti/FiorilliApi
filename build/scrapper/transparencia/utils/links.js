"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLink = void 0;
var links = [
    {
        link: 'lnkDespesasPor_NotaEmpenho',
        pageUrl: 'DespesasPorEntidade.aspx',
    },
    {
        link: 'lnkDespesasPor_ExtraOrcamentaria',
        pageUrl: 'DespesasPorEntidade.aspx',
    },
    {
        link: 'lnkReceitaExtraOrcamentaria',
        pageUrl: 'ReceitasPorEntidade.aspx',
    },
    {
        link: 'LnkTransf',
        pageUrl: 'TransferenciasPorEntidade.aspx',
    },
];
function getLink(link) {
    return links.find(function (l) { return l.link == link; }) || links[0];
}
exports.getLink = getLink;
//# sourceMappingURL=links.js.map