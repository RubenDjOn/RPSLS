'use strict';
/** @jsx React.DOM */

var React = require('react');

var Scoreboard = React.createClass({
    propTypes: {
        userScore: React.PropTypes.number,
        computerScore: React.PropTypes.number,
        userClassName: React.PropTypes.string,
        computerClassName: React.PropTypes.string,
    },
    render: function() {
        return (
            <div className="row">
              <div className="small-2 columns">
                <div>Jugador</div>
                <div data-alert className="user-score alert-box success">{this.props.userScore}</div>        
              </div>      
              <div className="small-2 columns end">        
                <div>Ordenador</div>
                <div data-alert className="computer-score alert-box alert">{this.props.computerScore}</div>
              </div>
            </div>
        );
    }

});

module.exports = Scoreboard;