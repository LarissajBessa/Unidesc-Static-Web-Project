const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const produtoRoutes = require("./routes/produtos");
const mongoose = require('mongoose');

app.use(morgan('dev'));

mongoose.connect('mongodb+srv://Unidesc:unidesc@unidesc.wofk7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
 {useNewUrlParser: true, useUnifiedTopology: true });

//tratando o cors
app.use((req, res, next)=>{
res.header("Acess-Control-Allow-Origin","*");
res.header(
    "Acess-Control-allow-Headers",
    "Origin X´-Requested-With, Content-Type,  Accept, Authorization"
);
if(req.method == "OPTIONS"){
    req.header("Acess-Control-Allow-Methods", "PUT, POST, PATH, GET, DELETE");
    return res.status(200).json({});
}
next();

});

app.use(bodyParser.urlencoded({extender:true}));
app.use(bodyParser.json());

app.use('/produtos', produtoRoutes);
app.use((req, res, next) =>{
    const error = new Error('not found/não encontrado');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500 );
    res.json({
        error:{
            message: error.message
        }
    });

});

module.exports = app;