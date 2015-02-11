var React = require('react');
var Renderer = require('./Renderer.jsx');
var moment = require('moment');
var marked = require('marked');

var Post = React.createClass({
  render: function() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <small>Posted by {this.props.author} at {formatDate(this.props.created_at)}</small>
        <p dangerouslySetInnerHTML={{__html: marked(this.props.body)}}></p>
        <Renderer renderer={this.props.renderer} />
      </div>
    );
  }
});

function formatDate (dateStr) {
  return moment(dateStr).format('LLLL');
}

module.exports = Post;
