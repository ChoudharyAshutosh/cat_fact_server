var parser = require('body-parser');
var express = require('express');
var cors = require('cors');
var app = express();
var PORT = 4000;
var functions = require('./application/library/libraryFunctions');
var {connectDB} = require('./config/mongoose');

app.use(cors());
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());

require('./application/router/routeManager')(app);

app.use(function(req,res){
    res.status(404).json({
        status: false,
        code: 404,
        msg: 'Error Not Found'
    });
});

connectDB()
.then(()=>{
    app.listen(PORT, ()=>{
        let ip = functions.getLocalIPv4();
        console.log(`Server running on address => ${ip}/${PORT}`);
        console.log(`Copy & paste server ip address i.e. "${ip}" in app on opening app`);
    });
})
.catch(error =>{
    console.log(error);
})



