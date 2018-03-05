/*

*/
var cArray = require('./data.js')
var cdb = cArray.cdb;

/*
The database is an ARRAY of 20 charities imported from the data.js file. This array is called 'cdb'
Each member of the array is organized as a JSON format. 
[
    {key1:charity1Value1, key2:charity1Value2 ... key-n:charity1Value-n},
    {key1:charity2Value1, key2:charity2Value2 ... key-n:charity2Value-n},
    .
    .
    .
    {key-z:charity-z-Value1, key2:charity-z-Value2 ... key-n:charity-z-Value-n}
]

To pull a charity object call cdb[i]
To go within that object to reach a property call cdb[i]["property"]

Example: Set a new variable equal to the mission of the 5th Charity. Uncomment below to see it work. 
*/
//var mission = cdb[4]["mission"]; console.log(mission);
/*

*/


module.exports = class Search {
    constructor(searchPhrase,database){
        this.database = database;
        this.searchPhrase = searchPhrase;
        this.resultsObject = {}
    }

    testMethod(){
        console.log("in method in search class");
    }

    getCharity(index){
        return cdb[index];
    }
}


