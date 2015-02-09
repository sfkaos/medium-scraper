https = require 'https'

exports.rest = (host, endpoint, method, callback) ->
  headers =
    'Accept': 'application/json'

  options =
    'host': host
    'path': endpoint
    'method': method
    'headers': headers

  req = https.request options, (res) ->
    res.setEncoding 'utf-8'
    responseString = ''

    res.on 'data', (data) ->
      responseString += data

    res.on 'end', () ->
      responseObject = JSON.parse responseString.replace '])}while(1);</x>', ''
      callback responseObject

  req.end()

exports.getPost = (collection, id, callback) ->
  exports.rest 'medium.com', '/' + collection + '/' + id, 'GET', (data) ->
    if data.success
      paragraphs = []
      for p in data.payload.value.content.bodyModel.paragraphs
        links = []
        for l in p.markups
          if l.type == 3
            links.push
              'start': l.start
              'end': l.end
              'href': l.href
        paragraphs.push
          'text': p.text
          'type': p.type
          'links': links

      author = (v for k,v of data.payload.references.User)[0]
      collection = (v for k,v of data.payload.references.Collection)[0]
      callback
        'success': true
        'title': data.payload.value.title
        'createdAt': data.payload.value.createdAt
        'subTitle': data.payload.value.content.subtitle
        'author': author
        'collection': collection
        'paragraphs': paragraphs
    else
      callback
        'success': false

exports.getCollection = (collection, callback) ->
  exports.rest 'medium.com', '/' + collection, 'GET', (data) ->
    if data.success
      posts = []
      for p in data.payload.posts
        posts.push
          'id': p.id,
          'title': p.title,
          'createdAt': p.createdAt

      author = (v for k,v of data.payload.references.User)[0]
      callback
        'success': true
        'name': data.payload.value.name
        'author': author
        'createdAt': data.payload.value.createdAt
        'description': data.payload.value.description
        'shortDescription': data.payload.value.shortDescription
        'posts': posts
    else
      callback
        'success': false

exports.getUser = (username, callback) ->
  exports.rest 'medium.com', '/@' + username, 'GET', (data) ->
    if data.success
      posts = []
      for p in data.payload.latestPosts
        posts.push
          'id': p.id
          'title': p.title
          'createdAt': p.createdAt

      collections = []
      for c in data.payload.collections
        collections.push
          'id': c.id
          'title': c.title
          'tags': c.tags
          'createdAt': c.createdAt
          'description': c.description
          'shortDescription': c.shortDescription

      callback
        'success': true
        'userId': data.payload.value.userId
        'name': data.payload.value.name
        'createdAt': data.payload.value.createdAt
        'bio': data.payload.value.bio
        'posts': posts
        'collections': collections
    else
      callback
        'success': false
