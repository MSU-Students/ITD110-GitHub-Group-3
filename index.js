const level = require('level');
const db = connectToDatabase('./leveldb');
var status = ['Applying', 'Under Interview', 'Exam Pending', 'Admitted', 'Probationary'];

(async function() {
    await acceptStudent('201811827', 'Norhani A. Ayaon', 22, 'Marawi City');
    var ScheduleDate = 'Februaryd 1, 2021';
    await scheduleInterview('201811827', ScheduleDate);
}());

function connectToDatabase(dbName){
    return level(dbName, { valueEncoding: 'json' });
}

async function acceptStudent(id, fullName, age, address){
    const student = { 
        ID: id, 
        Name: fullName, 
        Age: age, 
        Address: address,
        Status : 'Applying'
    };
    await db.put(id, student);
    console.log(student);
    
}

async function scheduleInterview(id, scheduleDate){
    const student = await db.get(id);
    student.Status = 'Under Interview';
    student.ScheduleDate= scheduleDate;
    await db.put(id, student);
    console.log(student);
}
