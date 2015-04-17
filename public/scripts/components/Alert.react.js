'use strict';
/** @jsx React.DOM */

var React = require('react');

var Alert = React.createClass({
    propTypes: {
        winner: React.PropTypes.string
    },
    render: function() {
        var classNames = require('classnames');                
        var classes = classNames({
            'alert-box': true,
            'radious': true,
            'small-6': true,
            'columns': true,
            'success': (this.props.winner=='user'),
            'user-wins': (this.props.winner=='user'),
            'alert': (this.props.winner=='computer'),
            'computer-wins': (this.props.winner=='computer')
        });

        return (
            <div className="row">
              <div data-alert className={classes}>
                <p>El ganador de esta ronda es <b>{this.props.winner}</b></p>
                <p>Enhorabuena, has ganado</p>                
              </div>
            </div>
        );
    }

});

module.exports = Alert;