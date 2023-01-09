const mongoose = require('mongoose');

const DCdataSchema = new mongoose.Schema({
    // dateSubmitted:{
    //     type: Date,
    //     required: true
    // },

    childGivenName: {
        
        type: String,
        required: true
    },
    childMiddleName: {
        type: String,
        required: true,
        min: 0

    },
    childSurName: {
        type: String,
        //enum: ['fruit','vegetable','dairy'],
        required: true,
    }
})

const DCdata = mongoose.model('Product', DCdataSchema);

module.exports = DCdata;