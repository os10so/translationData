const mongoose = require('mongoose');
const Product = require('./models/products');
const Embalmer = require('./models/embalmer');

mongoose.connect('mongodb://localhost:27017/testData', { useNewUrlParser: true, useunifiedTopology: true })
    .then(() => {
        console.log("SUCCESS - MONGO CONNECTION")
    })
    .catch(err => {
        console.log("ERROR - MONGO CONNECTION")
        console.log(err)
    })

// PRODUCTS//

// const p = new Product({
//     childGivenName: 'Juan',
//     childMiddleName: 'Martinez',
//     childSurName: 'dela Cruz'
// })

// p.save().then(p => {
//     console.log(p)
//     })
//     .catch(e => {
//         console.log(e)
//     })



//EMBALMER//


const embalmer = new Embalmer({
    embalmerGivenName: 'Austin', 
    embalmerMiddleName: 'Go',
    embalmerSurName: 'So', 
    embalmerAddress1: '528 Lavezares', 
    embalmerAddress2: 'Manila',
    embalmerDesignation: 'Licensed Embalmer',
    embalmerLicense: '0000215',
    embalmerLicenseIssedAt: 'MANILA DOH',
    embalmerLicenseIssedOn: 'Nov 11, 2022',
    embalmerLicenseExpiryDate: 'Nov 11, 2022',
})

embalmer.save().then(embalmer => {
    console.log('seed embaler data saved');
    console.log(embalmer)
    })
    .catch(e => {
        console.log(e)
    })