const mongoose = require('mongoose');

const BCXXSchema = new mongoose.Schema({
    childGivenName: String,
    childMIddleName: String,
    childsurName: String
});

const Person = mongoose.model('Person', BCXXSchema);
const person = new Person({
    childGivenName: "Austin",
    childMIddleName: "Go",
    childsurName: "So"
});

//person.save();

//mongoose.connect("mongodb://localhost:27017/DCXX", {useNewUrlParser: true}); //USE THIS ONLY ONCE TI CONNECT TO DBS

const DCXXSchema = new mongoose.Schema({
    childGivenName: {
        type: String,
        required: [true, "Please provide Given Name!"]
    },
    childMIddleName: String,
    childsurName: String
});

const Fruit = mongoose.model('Fruit', DCXXSchema);
const fruit = new Fruit({
    childGivenName: "Austin",
    childMIddleName: "Go",
    childsurName: "So"
});

fruit.save();

const Product = mongoose.model('Product', productSchema);

module.exports = Product;