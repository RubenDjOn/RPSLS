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
            <div>
                <ul className="button-group even-2 small-12 columns">
                <li id={1} className="button small secondary"><strong>Player</strong>&nbsp;
                    <span className="user-score">{this.props.userScore}</span>
                </li>        
                <li id={2} className="button small secondary"><strong>Computer</strong>&nbsp;
                    <span className="computer-score">{this.props.computerScore}</span>
                </li>
                </ul>
            </div>
        );
    }

});

module.exports = Scoreboard;