var express = require('express');
var cors = require("cors");
var medium = require('node-medium');

var app = express();
app.use(cors());



app.get('/', function(req,res) {
  // https://medium.com/@yelpmontreal
  medium.getUser('yelpmontreal', function(data) {
    var postArr = data.posts;
    postArr.forEach(function(post) {
     medium.getPost(null, post.id, function(data) {
        res.write(JSON.stringify(data));
      });
    });
    res.end();
  });

});
var port = process.env.PORT || 3000;
app.listen(port);