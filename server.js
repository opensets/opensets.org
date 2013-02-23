var express = require('express');
var mongodb = require('mongodb');

var mongoUri = process.env.MONGODB_URL ||
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/default';

mongodb.MongoClient.connect(mongoUri,function(err,db) {
  var site = require('./index.js')(db);
  var port = process.env.PORT || 5000;
  site.listen(port, function() {
    console.log("Listening on port " + port);
  });
}); //db.connector.open({
