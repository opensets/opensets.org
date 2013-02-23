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
  var sets = db.collection('sets');

  var app = express();

  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.locals.pretty = true;

  app.use(express.bodyParser());

  app.get('/',function(req,res){
    res.render('index',{path:'/'});
  });
  app.get('/details/:name',function(req,res){
    var name = req.params.name || null;
    sets.findOne({slug: name},function(err,doc){
      if(err){
        res.send(500,err);
      } else if (!doc) {
        respondNotFound(req,res);
      } else {
        res.render('details',{doc: doc});
      }
    });
  });

  app.get('/about',staticPage('about','About','/about'));

  app.use(express.static(__dirname+'/static'));

  app.use(respondNotFound);

  return app;
};
