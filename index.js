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
    rateEntranceExam(id, status);
}

async function rateEntranceExam(id, status){
    var examScore = Math.random() * (120 - 40) + 40;
    examScore = examScore.toFixed();
    await db.get(id, function(err, value){
        if(examScore >= 70){
            console.log('\n')
            console.log(value)
            console.log(' Exam score: ' + examScore);
            console.log(' Status: ', status[3]);
        } else{
            console.log('\n')
            console.log(value)
            console.log(' Exam score: ' + examScore);
            console.log(' Status: ', status[4]);
        }
    })
    deleteStudent(id);
}

async function deleteStudent(id){
    await db.del(id)
    db.get(id, function(err, value){
        if(err){
            console.log('\n Data is deleted');
        } else{
            console.log(value); 
        }
    })
}
