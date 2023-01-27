const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const { provinceList, provinceMap, cityList, cityMap, citymun_, province_ } = require('./indextestjson.js');



// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }

require("dotenv").config(); //for .env file access

const DCdata = require('./models/products');
const embalmerData = require('./models/embalmer');
const designationData = require('./models/designation');
const bodyParser = require("body-parser");

// const { AsyncLocalStorage } = require("async_hooks");

// DATABASE - BIRTH CERTIFICATE FORMAT XX

DB_URL = "mongodb+srv://" + process.env.mongoUserName + ":" + process.env.password + "@cluster0.yyhs4yx.mongodb.net/" + process.env.dbName;

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
    month: ('0' + (date.getMonth() + 1)).slice(-2),
    monthWord: months[date.getMonth()],
    year: date.getFullYear(),
}

app.get('/', (req, res) => {
    // console.log("APP.GET HOME PAGE");
    res.render('home', { dateToday, date });
})

// app.get("/DC",  (req, res) => {
//     res.render('home');
// })

app.get("/DC/new", (req, res) => {
    res.render('deathCertificateForm', { date });
})

app.post('/DC', async (req, res) => {
    const newData = new DCdata(req.body);
    console.log(newData);
    console.log(req.body);
    await newData.save();
    console.log(newData._id);
    res.redirect(`/DC/${newData._id}`);
    //res.send('SUBMITTED');
})

app.get("/DC/:id", async (req, res) => {
    const { id } = req.params;
    const data = await DCdata.findById(id);
    console.log("data log", data);
    res.render('check', { data });
})

app.get("/DC/:id/edit", async (req, res) => {
    const { id } = req.params;
    const data = await DCdata.findById(id);
    res.render('edit', { data });
})

app.put('/DC/:id', async (req, res) => {
    const { id } = req.params;
    const data = await DCdata.findByIdAndUpdate(id, req.body, { runvalidators: true });
    res.redirect(`/DC/${data._id}`);
})

app.delete('/DC/:id', async (req, res) => {
    const { id } = req.params;
    const data = await DCdata.findByIdAndDelete(id);
    //res.send("delete")
    res.redirect('/DC');
})

app.get("/DC", async (req, res) => {
    const data = await DCdata.find({});
    //console.log(data);
    res.render('list', { datas: data });
})

//EMBALER //
app.get("/embalmer/new", (req, res) => {
    res.render('embalmerForm');
})

app.get("/embalmer", async (req, res) => {
    const data = await embalmerData.find({}).sort({ "embalmerGivenName": 1 });
    res.render('embalmerList', { date, datas: data });
})

app.post('/embalmer', async (req, res) => {
    const newData = new embalmerData(req.body);
    console.log(newData);
    console.log(req.body);
    await newData.save();
    console.log(newData._id);
    res.redirect(`/embalmer/${newData._id}`);
    //res.send('SUBMITTED');
})

app.get("/embalmer/:id", async (req, res) => {
    const { id } = req.params;
    const data = await embalmerData.findById(id);
    // console.log("data log", data);
    res.render('embalmerCheck', { data });
})

app.get("/embalmer/:id/edit", async (req, res) => {
    const { id } = req.params;
    const data = await embalmerData.findById(id);
    res.render('embalmerEdit', { data });
})

app.put('/embalmer/:id', async (req, res) => {
    const { id } = req.params;
    const data = await embalmerData.findByIdAndUpdate(id, req.body, { runvalidators: true });
    //console.log("putputputputputput", data)
    //res.send("edited file")
    //res.redirect(`/embalmer/${data._id}`);
})

app.delete('/embalmer/:id', async (req, res) => {
    const { id } = req.params;
    const data = await embalmerData.findByIdAndDelete(id);
    //res.send("delete")
    res.redirect('/embalmer');
})

// POSITION / DESIGNATION
app.get("/designation/new", (req, res) => {
    res.render('designationForm', { provinceList, provinceMap, cityList, cityMap, citymun_, province_ });
    //todo, passing cityList and citymap array
    //get dynamic data and dyamically choose what city to extract
    //use ejs to provide the datalist
})

app.get("/designation", async (req, res) => {
    // const data = await designationData.find({}).sort({"designationLocationProvince":1});
    const data = await designationData.find({}).sort([["designationLocationProvince", 1], ["designationLocationCity", 1], ["designationGivenName", 1]]);
    res.render('designationList', { date, datas: data });
})

app.post('/designation', async (req, res) => {
    const newData = new designationData(req.body);
    // console.log(newData);
    // console.log(req.body);
    await newData.save();
    //res.redirect('/designation');

    res.redirect(`/designation/${newData._id}`);
})

app.get("/designation/:id", async (req, res) => {
    const { id } = req.params;
    const data = await designationData.findById(id);
    console.log("get data log", data);
    res.render('designationCheck', {data});
})

app.get("/designation/:id/edit", async (req, res) => {
    const { id } = req.params;
    const data = await designationData.findById(id);
    console.log("get(/designation/:id/edit", data);
    res.render('designationEdit', { data , provinceList, provinceMap, cityList, cityMap, citymun_, province_ });
})

app.put('/designation/:id', async (req, res) => {
    const { id } = req.params;
    //const data = await designationData.findByIdAndUpdate(id, req.body, { runvalidators: true });

    console.log('req.body.designationYear', req.body.designationYear);
    console.log('req.body.designationYearRemoval', req.body.designationYearRemoval);

    const data = await designationData.findByIdAndUpdate(
        { _id: id },
        {
            designationLocationProvince: req.body.designationLocationProvince,
            designationLocationCity: req.body.designationLocationCity,
            designationPostion: req.body.designationPostion,
            designationGivenName: req.body.designationGivenName,
            designationMiddleName: req.body.designationMiddleName,
            designationSurName: req.body.designationSurName,
        },
    )

    //adding data to array
    await designationData.updateOne(
        { _id: id },
        {
            $addToSet: {
                designationYear://https://www.mongodb.com/docs/manual/reference/operator/update/sort/#mongodb-update-up.-sort
                    req.body.designationYear
            },
        },
    )

    //removing of array data
    await designationData.updateOne(//https://www.youtube.com/watch?v=YPPUAUk9I-w
        { _id: id },
        { $pull: { designationYear: {$in:[req.body.designationYearRemoval ,""]} } }, //https://stackoverflow.com/questions/48709923/mongodb-pull-multiple-objects-from-an-array
    )
    
    //sort
    await designationData.updateOne(//https://www.mongodb.com/docs/manual/reference/operator/update/sort/
        { _id: id },
        { $push: { designationYear: {
              $each: [],
              $sort: 1 } } }
    )
    res.redirect(`/designation/${data._id}`);
})

app.delete('/designation/:id', async (req, res) => {
    const { id } = req.params;
    const data = await designationData.findByIdAndDelete(id);
    //res.send("delete")
    res.redirect('/designation');
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
    console.log(`listening to port ${port}`);
})