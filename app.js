var express = require('express');
var mongoose=require('mongoose');
var bodyparser= require('body-parser')

var db=mongoose.connect('mongodb://localhost:27017/bookAPI',function(){
    console.log('DB connected')
    }
);
var Book= require('./model/bookModel')

var app = express();

var port= process.env.PORT || 3000;

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());

bookrouter=require('./Routes/bookRoutes')(Book);


app.use('/api',bookrouter);

app.get('/',function(req,res){
    res.send("welcome to our api")
});



app.listen(port,function(){
    console.log("running on port " + port);
});