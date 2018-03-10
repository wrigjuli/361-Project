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
//var mission = cdb[4]["mission"]; 
//console.log(mission);
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
	
	searchCharities(keyword){
		var array = [];
		for (var i = 0; i < cdb.length; i++){
			var name = cdb[i]["charityName"];
			var tag = cdb[i]["tagLine"];
			var mission = cdb[i]["mission"]
			if (name.indexOf(keyword) != -1 || tag.indexOf(keyword) != -1 || mission.indexOf(keyword) != -1){
				console.log(name);
				array.push(this.getCharity(i));
			}
		}
		return array;
	}

//Function for Location Search?
    searchLocation(keyword){
        var array = [];
        for (var i = 0; i < cdb.length; i++){
            var name = cdb[i][charityName];
            var city = cdb[i]["mailingAddress.city"];
            var state = cdb[i]["mailingAddress.stateOrProvince"];
            if (city.indexOf(keyword) != -1 || state.indexOf(keyword) != -1){
                console.log(name);
                array.push(this.getCharity(i));
            }
        }
        return array;
    }

//Function for Type Search?
    searchType(keyword){
        var array = [];
        for (var i = 0; i < cdb.length; i++){
            var name = cdb[i][charityName];
            var category = cdb[i]["category.categoryName"];
            var cause = cdb[i]["cause.causeName"];
            if (category.indexOf(keyword) != -1 || cause.indexOf(keyword) != -1){
                console.log(name);
                array.push(this.getCharity(i));
            }
        }
    	return array;
    }
	
}	


