var express = require('express');
var cors = require("cors");
var medium = require('node-medium');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var PostSchema = new Schema({
  name: String
});

var Post = mongoose.model('Post', PostSchema);
var app = express();
app.use(cors());



app.get('/', function(req,res) {

  // https://medium.com/@yelpmontreal
  medium.getUser('yelpmontreal', function(data) {
    var postArr = data.posts;
    postArr.forEach(function(post) {
      return medium.getPost(null, post.id, function(data) {
        console.log(data);
        res.json(data);
      });
    });
  });

});


app.listen(3000);