

const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const dbUrl = process.env.DB_URL;


const DCdata = require('./models/products');
const embalmerData = require('./models/embalmer');
const bodyParser = require("body-parser");
// const { AsyncLocalStorage } = require("async_hooks");

//mongoose.connect("mongodb://localhost:21017/Dictionary");

// const dictionarySchema = new mongoose.Schema({
//     english: 
// })

// DATABASE - BIRTH CERTIFICATE FORMAT XX

DB_URL = "mongodb+srv://" + userName + ":" + password + "@cluster0.yyhs4yx.mongodb.net/" + dbName;

// mongoose.connect("mongodb://localhost:27017/testData", { useNewUrlParser: true })
mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("SUCCESS - DB CONNECTION");
    })
    .catch(err => {
        console.log("ERROR - DB CONNECTION");
        console.log(err);
    })

// app.use((req, res) =>{
//     console.log("app.use is running ");
//     // res.send("this is for the http response");
// })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: true })); //for reading post request console.log(req.body)
app.use('/css', express.static(__dirname + '/public/css')); //middleware //repository of static files //__dirname refers to the current working directory where this file is running
// app.use(express.static(__dirname + '/public')); this is same as the one number above


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const date = new Date();
dateToday = {
    day: date.getDate(),
    month: ('0' +(date.getMonth() + 1)).slice(-2),
    monthWord: months[date.getMonth()],
    year: date.getFullYear(),
}

app.get('/', (req, res) => {
    console.log("APP.GET HOME PAGE");
    res.render('home', {dateToday, date});
})

// app.get("/DC",  (req, res) => {
//     res.render('home');
// })

app.get("/DC/new",  (req, res) => {
    res.render('deathCertificateForm', {date});
})

app.post('/DC', async (req, res) => {
    const newData = new DCdata(req.body);
    console.log(newData);
    console.log(req.body);  
    await newData.save();
    //res.redirect('/check/${newData._id}');
    console.log(newData._id);
    res.redirect(`/DC/${newData._id}`);
    //res.send('SUBMITTED');
})

app.get("/DC/:id",  async(req, res) => {
    const {id} = req.params;
    const data = await DCdata.findById(id);
    console.log("data log", data);
    res.render('check', {data});
})

app.get("/DC/:id/edit",  async(req, res) => {
    const {id} = req.params;
    const data = await DCdata.findById(id);
    res.render('edit', {data});
})

app.put('/DC/:id', async(req,res)=>{
    const {id} = req.params;
    const data = await DCdata.findByIdAndUpdate(id, req.body, {runvalidators:true});
    res.redirect(`/DC/${data._id}`);
})

app.delete('/DC/:id', async(req,res)=>{
    const {id} = req.params;
    const data = await DCdata.findByIdAndDelete(id);
    //res.send("delete")
    res.redirect('/DC'); 
})

app.get("/DC",  async (req, res) => {
    const data = await DCdata.find({});
    //console.log(data);
    res.render('list', {datas: data}); 
})



//EMBALER //
app.get("/embalmer/new", (req, res) => {
    res.render('embalmerForm');
})

app.get("/embalmer", async(req, res) => {
    const data = await embalmerData.find({});
    res.render('embalmerList',  {date, datas: data});
})

app.post('/embalmer', async (req, res) => {
    const newData = new embalmerData(req.body);
    console.log(newData);
    console.log(req.body);  
    await newData.save();
    //res.redirect('/check/${newData._id}');
    console.log(newData._id);
    res.redirect(`/embalmer/${newData._id}`);
    //res.send('SUBMITTED');
})

app.get("/embalmer/:id",  async(req, res) => {
    const {id} = req.params;
    const data = await embalmerData.findById(id);
    console.log("data log", data);
    res.render('checkEmbalmer', {data});
})

app.get("/embalmer/:id/edit",  async(req, res) => {
    const {id} = req.params;
    const data = await embalmerData.findById(id);
    res.render('editEmbalmer', {data});
})

app.put('/embalmer/:id', async(req,res)=>{
    const {id} = req.params;
    const data = await embalmerData.findByIdAndUpdate(id, req.body, {runvalidators:true});
    //res.send("edited file")
    res.redirect(`/embalmer/${data._id}`);
})

app.delete('/embalmer/:id', async(req,res)=>{
    const {id} = req.params;
    const data = await embalmerData.findByIdAndDelete(id);
    //res.send("delete")
    res.redirect('/embalmer'); 
})

// app.get("/DC",  async (req, res) => {x
//     const data = await DCdata.find({});
//     //console.log(data);
//     res.render('list', {datas: data}); 
// })

// OLD FILE EDITED 

//var sum = 10 + 10;

// app.get("/", (req, res) => {
//     console.log("APP.GET HOME PAGE");
//     res.render("index", { testEJS: sum });
// })

// app.post("/", (req, res) => {
//     console.log("APP.POST GET BODY DATA");
//     console.log(req.body);
//     res.redirect('/');
// })

// app.get('/cats',(req,res)=>{
//     console.log("cat request");
//     res.send("meow");
// })
//  // in http link, then "/XXXXX" is .params
//  // in http link, then "?X=YYYYYY" is .query
// app.get("/austin/:adj1/:adj2", (req, res)=>{
//     const {adj1, adj2} = req.params;
//     console.log(req.params);
//     res.send(`TWO Description <br> Austin is ${adj1} and ${adj2}.`)
// })
// app.get("/austin/:adj1", (req, res)=>{
//     const {adj1} = req.params;
//     console.log(req.params);
//     res.send(`ONE Description <br> Austin is ${adj1}.`)
// })


// if (process.env.NODE_ENV !== "PRODUCTION"){
//     require('dotENV').config();
// }

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening to port $[port}`);
})