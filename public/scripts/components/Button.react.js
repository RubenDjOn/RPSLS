'use strict';
/** @jsx React.DOM */

var React = require('react');

var Button = React.createClass({
    
    propTypes: {
        name: React.PropTypes.string,
        className: React.PropTypes.string,
        _onClick: React.PropTypes.func        
    },
    render: function() {
        return (
            <button onClick={this.props._onClick} 
                    className={this.props.className}>{this.props.name}</button>
        );
    }
});

module.exports = Button;