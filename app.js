const express = require("express");
const bodyParser = require("body-parser");


const app = express();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let items =[];
let worklist =[];

//todo list
app.get("/",function(req,res){

    let options ={
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    let today = new Date();

    let day = today.toLocaleDateString("en-GB", options);
    
    res.render("list",{listtitle  : day, newitem : items});
});


app.post("/",function(req,res){
    
    let item = req.body.listitem;

    if(req.body.list === "Work"){
        worklist.push(item);
        res.redirect("/work");
    }
    else{   
        items.push(item);
        res.redirect("/");
    }
   
})

//work list
app.get("/work", function(req,res){
    res.render("list",{listtitle  : "Work List", newitem : worklist});
})

app.listen(3000,function(req,res){
    console.log("Server is running in 3000 port");
});