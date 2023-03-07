var http = require("http"),
  httpProxy = require("http-proxy");

var proxy = httpProxy.createProxyServer({});

var server = http.createServer(function (req: any, res: any) {
  proxy.web(req, res, {
    target: "http://170.78.48.18:8079/Transparencia/VersaoJson",
  });
});

server.listen(80);
