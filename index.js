const level = require('level');
const db = connectToDatabase('./leveldb');

function connectToDatabase(db){
    return level(db, { valueEncoding: 'json' });
}
