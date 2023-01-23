//JSON Data from
//https://github.com/clavearnel/philippines-region-province-citymun-brgy/tree/master/json

let citymun = require('./public/json/refcitymun.json');
let province = require('./public/json/refprovince.json');

var citymun_ = citymun.RECORDS;
var province_ = province.RECORDS;
// console.log(citymun_.filter((citymun_) => citymun_.id < 2), citymun_.length);
// console.log(province_.filter((province_) => province_.id < 2), province_.length);

// for (i=0; i<province_.length; i++){
//     console.log(province_[i].provDesc);
// }
// console.log('here')


//----------------------PROVINCE-------------------------------------
provinceList = []; //Create and empty array for list of province
provinceMap = []; //Create and empty array for list of province with corresponding provincial code

for (i = 0; i < province.RECORDS.length; i++) {
    let provDes = province.RECORDS[i].provDesc; //Provincial Name
    let provCod = province.RECORDS[i].provCode; //Provincial Code
    if ((provDes.includes("NCR") && provinceList.includes("Metro Manila | National Capital Region | NCR")) || (provDes.includes("MANILA") && provinceList.includes("Metro Manila | National Capital Region | NCR"))) { //Checks if the current array data being read does include "NCR" / "MANILA" word. if yes, check if the array created does include the logner version word, if yes, do nothing // skip
        // console.log("skipped", province.RECORDS[i - 1]);
    }
    else if (provDes.includes("NCR") || provDes.includes("MANILA")) { //Checks if the current array data being read does include "NCR" / "MANILA" word. If yes, manually use the longer version of NCR / Metro Manila data
        provinceList.push("Metro Manila | National Capital Region | NCR");
        provinceMap.push(["Metro Manila | National Capital Region | NCR", [1339, 1374, 1375, 1376]]);
    }
    else {
        provinceList.push(Capitalize(provDes));
        provinceMap.push([Capitalize(provDes), provCod]);
    }
}

//removes duplicates search: Use ES6
//https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
provinceList = [... new Set(provinceList)].sort(); //remove duplicates //ascending sort
provinceMap = [... new Set(provinceMap)].sort(); //remove duplicates //ascending sort
// console.log(provinceList, provinceList.length);
// console.log(provinceMap, provinceMap.length);


//----------------------CITY / MUNICIPALITY-------------------------------------
cityList = []; //Create and empty array for list of city
cityMap = []; //Create and empty array for list of city with corresponding provincial code for mapping
for (i = 0; i < citymun.RECORDS.length; i++) {
    let citymunDes = citymun.RECORDS[i].citymunDesc; //City Name
    let citymunProvCod = citymun.RECORDS[i].provCode; //Corresponding provincial Code

    cityList.push(Capitalize(citymunDes));
    cityMap.push([Capitalize(citymunDes), citymunProvCod]);
}

cityList = [... new Set(cityList)].sort(); //remove duplicates //ascending sort
cityMap = [... new Set(cityMap)].sort(); //remove duplicates //ascending sort
// console.log(cityList, cityList.length);
// console.log(cityMap, cityMap.length);



//CAPITALIZE FIRST LETTER OF EVERY WORD FUNCTION
function Capitalize(tocapitalize) {
    const words = tocapitalize.split(" ");
    
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0] === "(" ? "(" + words[i][1].toUpperCase() + words[i].substr(2).toLowerCase() : words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
        // words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
    }
    return (words.join(" "));
}


module.exports = {provinceList, provinceMap, cityList, cityMap, citymun_, province_};