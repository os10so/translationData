const mongoose = require('mongoose');

const embalmerSchema = new mongoose.Schema({
    embalmerGivenName: String, 
    embalmerMiddleName: String,
    embalmerSurName: String, 
    embalmerAddress1: String, 
    embalmerAddress2: String,
    embalmerDesignation: String ,
    embalmerLicense: String,
    embalmerLicenseIssedAt: String,
    embalmerLicenseIssedOnYYYY: {
        type: Number,
        min: 1950,
        max: new Date().getUTCFullYear()+5,
    },
    embalmerLicenseIssedOnMM: {
        type: Number,
        min: 01,
        max: 12,
    },
    embalmerLicenseIssedOnDD: {
        type: Number,
        min: 01,
        max: 31,
    },
    embalmerLicenseExpiryYYYY: {
        type: Number,
        min: 1950,
        max: new Date().getUTCFullYear()+5,
    },
    embalmerLicenseExpiryMM: {
        type: Number,
        min: 01,
        max: 12,
    },
    embalmerLicenseExpiryDD: {
        type: Number,
        min: 01,
        max: 31,
    },
})

module.exports = mongoose.model('Embalmer', embalmerSchema);