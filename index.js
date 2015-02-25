var express = require('express');
var cors = require("cors");
var medium = require('node-medium');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var mediumPostSchema = new Schema({
  title: String,
  createdAt: { type: Date, default: Date.now },
  subTitle: String,
  author: {},
  paragraphs: []

});

var mediumPost = mongoose.model('mediumPost', mediumPostSchema);
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/RVmediumPosts');

var app = express();
app.use(cors());



app.get('/', function(req,res) {
  // https://medium.com/@elleluna
  medium.getUser('elleluna', function(data) {
    //console.log(data);
    var postArr = data.posts;
    postArr.forEach(function(post) {
     medium.getPost(null, post.id, function(data) {
       // console.log('data', data);
        mediumPost.update({title: data.title}, data, {upsert: true}, function(err) {
          //console.log('successfully saved', data.paragraphs[10]);
        });
      });
    });
  });

  mediumPost.find(function (err, posts) {
    return res.json(200, posts);
  });

});


app.get('/:id', function(req,res) {
  return mediumPost.findById(req.params.id, function (err, post) {
    if (!err) {
      return res.json(200, post);
    } else {
      return console.log(err);
    }
  });
});


app.listen(process.env.PORT || 3000);