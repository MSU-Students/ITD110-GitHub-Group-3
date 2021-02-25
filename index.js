var level = require('level');

var db = level('./leveldb');
var status = ['Applying', 'Under Interview', 'Exam Pending', 'Admitted', 'Probationary'];

// Issue #3 

acceptStudent(' 201811827 ', ' Norhani A. Ayaon ',' 21 ', ' Marawi City ');
function acceptStudent(id, fullName, age, address){
    console.log("   ------ Student Information ------  ");
    db.put(id, [id, fullName , age , address], function(err){
        
    })
    db.get(id, function(err, value){
        console.log(value,'\n Status: ', status[0]); 
    })
    scheduleInterview(id, 'March 02, 2021');
}

// Issue #4
async function scheduleInterview(id, scheduleDate){
    await db.get(id, function(err, value){
        console.log('\n')
        console.log(value);
        console.log(' Interview date:  ' + scheduleDate);
        console.log(' Status: ' + status[1])
    })
    scheduleExam(id, scheduleDate);
}
//OUTPUT = ['201811827', 'Norhani A. Ayaon', 22, 'Marawi City']

async function scheduleExam(id, scheduleDate){
    await db.get(id, function(err, value){
        var examDate = 'March 1, 2021';
        console.log('\n')
        console.log(value);
        console.log(' Status: ',  status[2])
        console.log(' Exam date on ' + examDate);
    })
}
