import express, { Express, Request, Response } from "express";
import axios from "axios";
import { execQuery } from "./query";
import getDespesa from "./puppeteer";

const app: Express = express();
const port = 8080;

const baseURL = "http://170.78.48.18:8079/Transparencia/";
const apiURL = `${baseURL}VersaoJson/`;
const empresa = "6";

const instance = axios.create({
  baseURL: apiURL,
  timeout: 5000,
  withCredentials: true,
  //headers: { "X-Custom-Header": "foobar" },
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/despesas/:inicio/:fim/", async (req: Request, res: Response) => {
  const inicio = new Date(Date.parse(req.params.inicio));
  const fim = new Date(Date.parse(req.params.fim));

  const data = await execQuery({
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
});

app.get("/empenho/:exercicio/:numero/", async (req: Request, res: Response) => {
  try {
    const data = await getDespesa({
      baseURL,
      exercicio: Number(req.params.exercicio),
      numero: req.params.numero,
    });
    res.send(data);
  } catch (e) {
    res.status(500);
    res.render("error", { error: e });
  }
});

app.get("/diarias/:inicio/:fim/", async (req: Request, res: Response) => {
  const inicio = new Date(Date.parse(req.params.inicio));
  const fim = new Date(Date.parse(req.params.fim));

  const data = await execQuery({
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
});

app.get("/receitas/:inicio/:fim/", async (req: Request, res: Response) => {
  const inicio = new Date(Date.parse(req.params.inicio));
  const fim = new Date(Date.parse(req.params.fim));

  const data = await execQuery({
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
});

app.get(
  "/transferencias/:inicio/:fim/",
  async (req: Request, res: Response) => {
    const inicio = new Date(Date.parse(req.params.inicio));
    const fim = new Date(Date.parse(req.params.fim));

    const data = await execQuery({
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
  }
);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
