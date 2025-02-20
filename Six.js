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
        <title>Six</title>
        </head>
        <body>
        <form action = "/result" method="POST">

        <input type="text" name="file1" placeholder="File 1 Name">
        <input type="text" name="file2" placeholder="File 2 Name">
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
           // console.log(body);

            const params = new URLSearchParams(body);
            const file1 = path.resolve(__dirname,params.get('file1'));
            const file2 = path.resolve(__dirname,params.get('file2'));
            fs.readFile(file1, 'utf-8', (err, data1) => {
                if (err) {
                    console.log(err);
                }
                fs.writeFile(file2, data1,{flag:'a'}, (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            } )

            res.end('Files Appended');
            
        });


    }
});

server.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
})
