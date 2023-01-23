const mongoose = require('mongoose');

const designationSchema = new mongoose.Schema({
    designationLocationProvince: String, 
    designationLocationCity: String,
    designationPostion: String,
    designationGivenName: String, 
    designationMiddleName: String, 
    designationSurName: String,
    designationYear: [Number],
})

module.exports = mongoose.model('Designation', designationSchema);