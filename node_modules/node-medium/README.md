# node-medium
An open-source node module to query Medium's users, collections and posts.
Now we can finally use our Medium posts elsewhere.

~~**Warning!** As of now, this is a private repository, due to Medium's [ToS](https://medium.com/policy/medium-terms-of-service-9db0094a1e0f). If anyone thinks it is safe to publish this repository publicly, I will do so.~~

## Une Hommage Courte
The Medium team has created something **special**. A beautiful and stunning web-service which reinvents blogging and brings it to a whole new level!

Medium is nothing less than the **best** blogging platform ever and the rapidly accelerating rates of new users and posts are proving just that.

*Cheers for creating such a great website!*

## Install

```
npm install node-medium
```

## Example

You can see all functions in action in the ```example.js``` file

## API

### exports.getUser(username, callback(data))

For ```username``` you can pass a valid user's username.

#### Callback
```
{
  'success': true / false,
  'userId': String,
  'name': String,
  'createdAt': Integer,
  'bio': String,
  'posts': Array,
  'collections': Array
}
```

##### posts
Returns objects of the following structure:
```
{
  'id': String,
  'title': String,
  'createdAt': Integer
}
```

##### collections
Returns objects of the following structure:
```
{
  'id': String,
  'title': String,
  'tags': [Strings],
  'createdAt': Integer,
  'description': String,
  'shortDescription': String
}
```

### exports.getCollection(collection, callback(data))

For ```collection``` you can pass a collection's name.

#### Callback
```
{
  'success': true / false,
  'name': String,
  'author': Object,
  'createdAt': Integer,
  'description': String,
  'shortDescription': String,
  'posts': Array
}
```

##### posts
Returns objects of the following structure:
```
{
  'id': String,
  'title': String,
  'createdAt': Integer
}
```

##### author
Returns Medium's original passed object filled with the author's data.

### exports.getPost(collection, id, callback(data))

For ```collection``` you can pass a collection's name.
For ```id``` you can pass an article's id of any article in the collection specified.

#### Callback
```
{
  'success': true / false,
  'title': String,
  'createdAt': Integer,
  'subTitle': String,
  'author': Object,
  'collection': Object,
  'paragraphs': Array
}
```

##### paragraphs
Returns objects of the following structure:
```
{
  'text': String,
  'type': Integer,
  links: [{
    'start': Integer,
    'end': Integer,
    'href': String
    }]
}
```

```type``` specifies of what kind the paragraph is. It can be a quote, a title, just text, etc.

##### collection
Returns Medium's original passed object filled with the collection's data.

##### author
Returns Medium's original passed object filled with the author's data.

## License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
