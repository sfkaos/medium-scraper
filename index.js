var express = require('express');
var cors = require("cors");
var medium = require('node-medium');
var request = require('request');
var cheerio = require('cheerio');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var mediumPostSchema = new Schema({
  title: String,
  // createdAt: { type: Date, default: Date.now },
  // subTitle: String,
  // author: {},
  // paragraphs: [],
  url: String,
  html: String,
  image: String,
  date: { type: Date, default: Date.now },
  description: String,
  tag: String
});

var mediumPost = mongoose.model('mediumPost', mediumPostSchema);
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/RVmediumPosts');

var app = express();
app.use(cors());



// app.get('/', function(req,res) {
//   // https://medium.com/@elleluna
//   medium.getUser('elleluna', function(data) {
//     //console.log('user', data);
//     var postArr = data.posts;
//     postArr.forEach(function(post) {
//       //console.log(post);
//      medium.getPost(null, post.id, function(data) {
//        // console.log('data', data);
//         mediumPost.update({title: data.title}, data, {upsert: true}, function(err) {
//           console.log('successfully saved', data);
//         });
//       });
//     });
//   });

//   mediumPost.find(function (err, posts) {
//     return res.json(200, posts);
//   });

// });

app.get('/', function(req,res) {

    var url = 'https://medium.com/@elleluna';

    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    request(url, function(error, response, html)  {
      // First we'll check to make sure no errors occurred when making the request
        // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
      var $ = cheerio.load(html);

      $('.blockGroup--latest.blockGroup--posts.blockGroup--list .block.block--list').filter(function() {
        var data = $(this);

        data.each(function(index, el) {
          var postURL = $(this).find('.postArticle a').attr('href');
          var title = $(this).find('h2#title').text();
          var description = $(this).find('h4#subtitle').text() || $(this).find('p.graf--p').text();
          var d = $(this).find('.postMetaInline-feedSummary .postMetaInline--supplemental a.link').text();
          var date = Date.parse(d);


          //grab postID from url by matching it with a regex
          var isolateID = postURL.substr(postURL.lastIndexOf('-') + 1);
          var postID = isolateID.substring(0,12);

          var mediumTagsURL = 'https://medium.com/_/api/posts/' + postID + '/tags';

          request(mediumTagsURL, function(error, response, html) {
            //console.log('tags? is that you?', html);
            var trimmed = html.substring(50);
            var trimmed2 = trimmed.split(',')[0];
            var plucked = trimmed2.split('"')[3];

            var model = {
              title: title,
              url: postURL,
              //image: grafImage,
              date: date,
              description: description,
              tag: plucked
            }

            mediumPost.update({date: date}, model, {upsert: true},  function(err) {
              console.log('successfully saved', model);
            });

          });


          if(isNumeric(date)) {
            request(postURL, function(error, response, html)  {
              var $$ = cheerio.load(html);
              var grafImage = $$('.graf-image').attr('src');

              console.log('model', model);
              var model = {
                title: title,
                url: postURL,
                image: grafImage,
                date: date,
                description: description
                //tag: plucked
              }

              mediumPost.update({date: date}, model, {upsert: true},  function(err) {
                console.log('successfully saved', model);
              });


            });
          }

        });
      });
    });

  mediumPost.find(function (err, posts) {
    return res.json(200, posts);
  });

});



// app.get('/:id', function(req,res) {
//   return mediumPost.findById(req.params.id, function (err, post) {
//     if (!err) {
//       return res.json(200, post);
//     } else {
//       return console.log(err);
//     }
//   });
// });



app.listen(process.env.PORT || 8080);
