/**
 * Created by 31641 on 2017-1-31.
 */
let http = require('http');
let url = require('url');
http.createServer(function (req, res)
{
    let postBody = '';
    res.writeHeader(200, {'Content-Type': 'text/plain', "Access-Control-Allow-Origin": "*"});
    req.on('data', (chunk) =>
    {
        postBody += chunk;
    });
    req.on('end', () =>
    {
        //noinspection JSCheckFunctionSignatures
        res.end(`Data received : Method === ${req.method}\n${postBody}\nQueryString : ${url.parse(req.url).query}`);
        console.log(`Data received : Method === ${req.method}\n${postBody}\nQueryString : ${url.parse(req.url).query}`);
    });
}).listen(3000);