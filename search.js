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

//reference: https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

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
		if (keyword != "") {
			var array = [];
            var lowerCaseKey = keyword.toLowerCase();
            var upperCaseKey = keyword.toUpperCase();
            //var firstCapKey = keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase();
            var firstCapKey = toTitleCase(keyword)
            //console.log(lowerCaseKey);
            //console.log(upperCaseKey);
            //console.log(firstCapKey);
			for (var i = 0; i < cdb.length; i++){
				var name = cdb[i]["charityName"];
				var tag = cdb[i]["tagLine"];
				var mission = cdb[i]["mission"];
				if (name.indexOf(keyword) != -1 || tag.indexOf(keyword) != -1 || mission.indexOf(keyword) != -1 || 
                	name.indexOf(lowerCaseKey) != -1 || tag.indexOf(lowerCaseKey) != -1 || mission.indexOf(lowerCaseKey) != -1 ||
                	name.indexOf(upperCaseKey) != -1 || tag.indexOf(upperCaseKey) != -1 || mission.indexOf(upperCaseKey) != -1 ||
                	name.indexOf(firstCapKey) != -1 || tag.indexOf(firstCapKey) != -1 || mission.indexOf(firstCapKey) != -1){
						//console.log("keyword data #" + i);
						//console.log(name);
						array.push(this.getCharity(i));
					}
			}
			return array;
		}
	}

//Function for Location Search?
// throws an error
    searchLocation(keyword){
    	if (keyword !=""){
    		var array = [];
			var lowerCaseKey = keyword.toLowerCase();
            var upperCaseKey = keyword.toUpperCase();
            //var firstCapKey = keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase();
            var firstCapKey = toTitleCase(keyword)
            //console.log(lowerCaseKey);
            //console.log(upperCaseKey);
            //console.log(firstCapKey);
        	for (var i = 0; i < cdb.length; i++){
            	var name = cdb[i]["charityName"];
            	var city = cdb[i]["mailingAddress"]["city"];
            	var state = cdb[i]["mailingAddress"]["stateOrProvince"];
           		if (city.indexOf(keyword) != -1 || state.indexOf(keyword) != -1 || 
                	city.indexOf(lowerCaseKey) != -1 || state.indexOf(lowerCaseKey) != -1 ||
                	city.indexOf(upperCaseKey) != -1 || state.indexOf(upperCaseKey) != -1 || 
                	city.indexOf(firstCapKey) != -1 || state.indexOf(firstCapKey) != -1){
						//console.log("location data #" + i);
						//console.log(city);
						//console.log(state);
                		array.push(this.getCharity(i));
            	}
        	}
        	return array;
    	}
    }

//Function for Type Search
    searchType(keyword){
    	if(keyword != ""){
    		var array=[];
        	for (var i = 0; i < cdb.length; i++){
				var name = cdb[i]["charityName"];
				var cause = cdb[i]["cause"]["causeName"];
				//console.log("test");
				if (cause == keyword){
					console.log("type data #" + i);
					console.log(cause);
					array.push(this.getCharity(i));
				}
			}
			return array;
		}
	}
}	
