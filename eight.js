let http = require('http');
let fs = require('fs');
let path  = require('path');

let server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    res.write(`<h1> Simple Web Server</h1>`)
});

server.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
})
