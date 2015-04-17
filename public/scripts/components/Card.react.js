'use strict';
/** @jsx React.DOM */

var tools = require('../tools/utils.js');

var React = require('react');

var Card = React.createClass({
    propTypes: {
        movement: React.PropTypes.string,
        player: React.PropTypes.string,
        _getClassName: React.PropTypes.func,
        _getCardStyle: React.PropTypes.func
    },
    _getClassName: function(){        
        return this.props.player + '-card card ' + this.props.movement;
    },
    _getCardStyle: function(){        
        //return '/img/' + this.props.movement + '-card.png';
        return ({
            backgroundImage: 'url(/img/' + this.props.movement + '-card.png)'
        });
    },
    render: function() {
        return (
            <div>
                <h1><small>{this.props.player.capitalizeFirstLetter()}</small></h1>
                <div className={this._getClassName()}                
                    style={this._getCardStyle()}>                
                </div>
                <h1 className="movement-text">{this.props.movement.capitalizeFirstLetter()}</h1>
            </div>
        );
    }

});

module.exports = Card;