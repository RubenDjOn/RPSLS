'use strict';
/** @jsx React.DOM */

var React = require('react');

var Card = React.createClass({
    propTypes: {
        movement: React.PropTypes.string,
        player: React.PropTypes.string,
        _getClassName: React.PropTypes.func
    },
    _getClassName: function(){        
        return this.props.player + '-card-' + this.props.movement;
    },
    render: function() {
        return (
            <div className={this._getClassName()}>
                {this.props.player}: {this.props.movement}
            </div>
        );
    }

});

module.exports = Card;