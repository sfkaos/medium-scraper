var medium = require('./index.js');

// https://medium.com/@medium
medium.getUser('medium', function(data) {
	console.log(data);
});

// https://medium.com/editors-picks
medium.getCollection('editors-picks', function(data) {
	console.log(data);
});

// https://medium.com/help-center/3eaed64aed8a
medium.getPost('help-center', '3eaed64aed8a', function(data) {
	console.log(data);
});
