'use strict';
/** @jsx React.DOM */

var React = require('react');
var classNames = require('classnames');

var Alert = React.createClass({
    propTypes: {
        winner: React.PropTypes.string,
        _getClasses: React.PropTypes.func
    },
    _getClasses: function (){
        var classes = 'hide';
        
        if (this._winnerExists()){
            classes = classNames({
            'alert-box': true,
            'radius': true,
            'text-center': true,
            'success': (this.props.winner=='user'),
            'user-wins': (this.props.winner=='user'),
            'alert': (this.props.winner=='computer'),
            'computer-wins': (this.props.winner=='computer')
            });
        }

        return classes;
    },
    _winnerExists: function(){
        return (this.props.winner!=='');
    },
    render: function() {
        var classes = this._getClasses();

        return (
            <div className="small-12 columns">
              <div data-alert className={classes}>
                <h4>El ganador de esta ronda es <b>{this.props.winner}</b></h4>
              </div>
            </div>            
        );
    }

});

module.exports = Alert;