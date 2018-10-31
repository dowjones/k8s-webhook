const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const hostname = '0.0.0.0';
const port = 8443;

const privateKey = fs.readFileSync('webhook.key').toString();
const certificate = fs.readFileSync('webhook.crt').toString();

const options = {key: privateKey, cert: certificate};

const app = express();
app.use(bodyParser.json());

app.post('/mutate', (req, res) => {
	console.log(req.body)
	console.log(req.body.request.object)
	let adminResp = {response:{
          allowed: true,
          patch: Buffer.from("[{ \"op\": \"add\", \"path\": \"/metadata/labels/foo\", \"value\": \"bar\" }]").toString('base64'),
          patchType: "JSONPatch",
        }}
        console.log(adminResp)
	res.send(adminResp)
})


const server = https.createServer(options, app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
