const level = require('level');
const db = connectToDatabase('./leveldb');
var status = ['Applying', 'Under Interview', 'Exam Pending', 'Admitted', 'Probationary'];

(async function() {
    await acceptStudent('201811827', 'Norhani A. Ayaon', 22, 'Marawi City');
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
        Status : status[0]
    };
    await db.put(id, student);
    console.log(student);
}