   let app,bodyParser,ejs,mongoose,express=require('express');
    
   app = express(); 
   ejs = require('ejs');
   app.set('view engine','ejs');
   mongoose = require('mongoose'); 
   app.use(express.static('public'));
   bodyParser = require('body-parser');
   app.use(bodyParser.urlencoded({extended: true}));

   mongoose.connect('mongodb://localhost:27017/Wikipedia', { useNewUrlParser: true,  useUnifiedTopology: true  });


   let articleschema = { title: String, content: String }
   let articles = mongoose.model('article',articleschema);


      /////////////////////////// Request targeting a specific route   /////////////////////////////////////

  app.route('/articles')

  .get(function(req,res) {	
  	 articles.find(function(err,response) {
  	 	 (!err) && console.log(response);
          res.send(response);
  	 });   
  })


  .post(function(req,res) {
  	let newarticles = new articles({
  		title: req.body.title,
  		content: req.body.content
  	})
       newarticles.save();
        res.send('Data Inserted successfully.');
  })


 .delete(function(req,res) {
  	  articles.deleteMany(function(err){
     (!err) && console.log('Data deleted successfully.')
  	  })
  	    res.send('Data Deleted successfully.');
  });

         /////////////////////////// Request targeting a specific route   /////////////////////////////////////
  app.route('/articles/:parameter')
   
 .get(function(req,res) {
 	let parameter = req.params.parameter;
 	articles.find({title: parameter},function(err,response) {
         (!err) && console.log(response);
         res.send(response);
 	});
      })
    
 .delete(function(req,res) {
 	let parameter = req.params.parameter;
 	articles.deleteOne({title: parameter}, function(err,response) {
 		(!err) && console.log('Article deleted successfully.');
 	})
 	res.send('Article deleted successfully.');
 })

 .put(function(req,res) {
 	let parameter = req.params.parameter;
 	articles.update(
 		{title: parameter},
 		{ title: req.body.title, content: req.body.content },
 		{overwrite: true},
 		function(err) {
 			(!err) && console.log('Data updated successfully through put.');
 		}
  		);
 	res.send('Data updated successfully through put.');
 })


 .patch(function(req,res) {
 	let parameter = req.params.parameter;
 	articles.update(
 		{title: parameter},
 		{$set: req.body},

 		function(err) {
 			(!err) && console.log('Data updated successfully through put.');
 		}
  		);
 	res.send('Data updated successfully through patch.');
 })


   app.listen(3000,console.log('Server started on port 3000.'));

  

  