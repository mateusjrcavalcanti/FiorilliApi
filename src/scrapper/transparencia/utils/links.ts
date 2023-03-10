const links = [
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

export function getLink(link: string) {
  return links.find((l) => l.link == link) || links[0];
}
