const level = require('level');
const db = connectToDatabase('./leveldb');

(async function main() {
    await acceptStudent('201811827', 'Norhani A. Ayaon', 22, 'Marawi City');


    await scheduleInterview('201811827', 'February 1, 2021');

    await scheduleExam('201811827', 'February 11, 2021');

    var ExamScore = Math.random() * (120);
    ExamScore = ExamScore.toFixed();
    await rateEntranceExam('201811827', ExamScore);

    await deleteStudent('201811827');
    
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
    student.InterviewDate= scheduleDate;
    await db.put(id, student);
    console.log(student);
}
async function scheduleExam(id, scheduleDate){
    const student = await db.get(id);
    student.Status = 'Pending Exam';
    student.ExamSchedule= scheduleDate;
    await db.put(id, student);
    console.log(student);   
}

async function rateEntranceExam(id, examScore){
    const student = await db.get(id);
    student.ExamScore = examScore;
    if (examScore >= 75){
        student.Status = 'Admitted';
    } else {
        student.Status = 'Probitionary';
    }
    await db.put(id, student);
    console.log(student);
}

async function deleteStudent(id){
    await db.del(id)
    db.get(id, function(err, value){
        if(err){
            console.log('\nData is deleted');
        } else{
            console.log(value); 
        }
    })
}
