var express = require('express');
var _ = require('underscore');
var httpProxy = require('http-proxy');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Post = require('../models/post.js');
var postId = 0;

module.exports = app;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/posts', function(req, res) {
  Post.find({}, function (err, posts) {
    res.send(posts);
  });
});

app.post('/posts', function(req, res) {
  var post = req.body;
  if (!post.title || !post.author || !post.body) {
    res.send(400, {success: false, error: "Missing parameters."});
  } else {
    new Post({
      id: ++postId,
      title: post.title,
      author: post.author,
      body: post.body,
      created: new Date()
    }).save();
    res.send({success: true});
  }
});

app.get('/posts/:id', function(req, res) {
  var id = parseInt(req.params.id, 10);
  var post = Post.findOne({id: id}, function (err, post) {
    if (post) {
      res.send(post);
    } else {
      res.send(404, {error: 'Not found.'});
    }
  })
});


/**
 * On the client, we want to be able to just send API requests to the
 * main web server using a relative URL, so we proxy requests to the
 * API server here.
 */
var proxy = new httpProxy.RoutingProxy();

app.proxyMiddleware = function(apiPort) {
  return function(req, res, next) {
    proxy.proxyRequest(req, res, {
      host: 'localhost',
      port: apiPort
    });
  };
};
