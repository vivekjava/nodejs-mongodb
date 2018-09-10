var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function mongodbOperation(database,collection,query,operation,filter,set,callback){
   
    mongo.connect(url,function(err, db) {
        if (err) return callback(err);
        console.log("Connection succeed.");
        var dbo = db.db(database);
        dbo.createCollection(collection, function(err, res) {
          if (err)  return callback(err);
          console.log("Collection created!");
        
          switch(operation){
            case "write": insertCollection(dbo,db,collection,query,callback);
            break;
            case 'readall':retrieveCollection(dbo,db,collection,query,callback);
            break;
           }

        });
    });
}



function insertCollection(dbObject,dbConnection,collection,query,callback){
    console.log("Insertion");
      dbObject.collection(collection).insert(query, function(err, res) {
        if (err)   return callback(err);
        console.log("1 document inserted");
        dbConnection.close();
        return callback(err,{"record":true});
      });
}



function retrieveCollection(dbObject,dbConnection,collection,query,callback){
    console.log("read");
      dbObject.collection(collection).find(query).toArray( function(err, res) {
        if (err)   return callback(err);
        console.log("getResult");
        dbConnection.close();
        return callback(err,res);
      });
}

exports.mongodbOperation = mongodbOperation ;