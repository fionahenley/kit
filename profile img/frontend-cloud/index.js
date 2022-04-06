const http = require('http');
const util = require('util');
const Formidable = require('formidable');
const cloudinary = require('cloudinary');
require('dotenv').config()

//cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

//CREATE SERVER
http.createServer((req, res) => {
    if (req.url === '/upload' && req.method.toLowerCase() === 'post') {}

        // parse a file upload
        const form = new Formidable();

        form.parse(req, (err, fields, files) => {

            
            cloudinary.uploader.upload(files.upload.path, result => {
                console.log(result)
                if (result.public_id) {
            
                    res.writeHead(200, { 'content-type': 'text/plain' });
                    res.write('received uploads:\n\n');
                    res.end(util.inspect({ fields: fields, files: files }));
                }
            });
});
return;
})

res.writeHead(200, { 'content-type': 'text/html' });
res.end(`
        
`);
// Port number
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('listening on 3001')});