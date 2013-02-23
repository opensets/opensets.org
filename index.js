var express = require("express");

function respondNotFound(req,res){
  res.status(404).render('notfound');
}

function staticPage(name,title,path){
  return function(req,res){
    res.render(name,{path: path, title: title});
  };
}

module.exports = function(db){
  var topics = db.collection('topics');

  var app = express();

  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.locals.pretty = true;

  app.use(express.bodyParser());

  app.get('/',function(req,res){
    topics.count(function(err,count){
      if(err){
        res.send(500,err);
      } else {
        res.render('index',{topiccount:count, path:'/'});
      }
    });
  });
  app.get('/details/:name',function(req,res){
    var name = req.params.name || null;
    topics.findOne({topic:topic, scope:scope},function(err,doc){
      if(err){
        res.send(500,err);
      } else if (!doc) {
        respondNotFound(req,res);
      } else {
        var title = topic;
        if(scope) title += '('+scope+')';
        res.render('inspect',{topic: doc, title: title});
      }
    });
  });

  app.get('/about',staticPage('about','About','/about'));

  app.use(express.static(__dirname+'/static'));

  app.use(respondNotFound);

  return routes;
};
