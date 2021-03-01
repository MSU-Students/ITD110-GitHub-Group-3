const level = require('level');
const db = connectToDatabase('./leveldb');

function connectToDatabase(dbName){
    return level(dbName, { valueEncoding: 'json' });
}
