var level = require('level');

var db = level('./leveldb');


// Issue #3 

var status = ['Applying'];
acceptStudent(' 201811827 ', ' Norhani A. Ayaon ',' 22 ', ' Marawi City ');
function acceptStudent(id, fullName, age, address){
    console.log("   ------ Student Information ------  ");
    db.put(id, [id, fullName , age , address], function(err){
        
    })
    db.get(id, function(err, value){
        console.log(value, status[0]); 
    })

}