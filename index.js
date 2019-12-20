const express = require("express");
const app = express();
const multer = require("multer");
const localRoute = require("./routes/localRoute");
const bodyParser = require("body-parser");

app.use('/', express.static('html'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/',(req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.use('/local', localRoute);

app.use((err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        error:err,
        message:err.message,
        stack:err.stack
    });
 
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});