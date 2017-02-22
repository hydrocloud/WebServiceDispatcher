const http = require("http");
const https = require("https");
const assert = require("assert");
const url = require("url");
const servicehub = require("servicehub-sdk");
const table = require("./table.js");
const no_resource_available_page = require("./no_resource_available_page.js");

let server = http.createServer().listen(5372);
let servicehubContext = new servicehub.ServiceHubContext("172.16.8.1:6619");

function wrap(f) {
    return async function (req, resp) {
        try {
            await f(req, resp);
        } catch (e) {
            console.log(e);
            resp.end("Unknown error");
        }
    };
}

server.on("request", wrap(async function (req, resp) {
    let reqUrl;
    try {
        assert(req.headers.host && table[req.headers.host]);
        reqUrl = await servicehubContext.getResourceAddr(table[req.headers.host]);
        assert(reqUrl && typeof(reqUrl) == "string");
    } catch(e) {
        resp.writeHeader(500);
        return resp.end(no_resource_available_page);
    }

    reqUrl += req.url;

    req.pause();

    let options = url.parse(reqUrl);
    options.headers = req.headers;
    options.method = req.method;
    options.agent = false;

    options.headers['host'] = options.host;

    let connector = (options.protocol == 'https:' ? https : http).request(options, (serverResponse) => {
        serverResponse.pause();

        resp.writeHeader(serverResponse.statusCode, serverResponse.headers);
        serverResponse.pipe(resp, { end: true }).on("error", e => console.log(e));;
        serverResponse.on("error", e => console.log(e));
        serverResponse.resume();
    });
    req.pipe(connector, { end: true }).on("error", e => console.log(e));;
    req.on("error", e => console.log(e));
    req.resume();
}));

