let http = require('http');
let fs = require('fs');
let path  = require('path');

let server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, {'content-type': 'text/html'});
        res.end(`<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Seven</title>
        </head>
        <body>
        <form action = "/result" method="POST">
        <input type="text" name="file1" placeholder="File 2 Name">
        <button type="submit">Submit</button>
        </form>
    
        </body>
        </html>`);
    }

    if (req.url === '/result' && req.method == 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            
            const params  = new URLSearchParams(body);
            const file1 = path.resolve(__dirname, 'file1.txt');

            fs.readFile(file1, 'utf-8' , (err,data) => {
                if (err) {
                    res.writeHead(404 , {'content-type' : 'text/html' });
                    res.end(`404 Not Found`);
                }
                res.writeHead(200, {'content-type': 'text/html'});
                res.end(data);

            })
        })
    }
});

server.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
})
