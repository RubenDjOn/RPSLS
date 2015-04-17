'use strict';

/** @jsx React.DOM */

var React = require('react'),
    Button = require('./Button.react');

var ButtonsList = React.createClass({
    
    propTypes: {
      buttons: React.PropTypes.array,
      _getButtonsFormated: React.PropTypes.func,
      _onButtonSelected: React.PropTypes.func
    },
    _getButtonsFormatted: function(){       
      return this.props.buttons.map(function(element, index){
        return <Button _onClick={this.props._onButtonSelected.bind(null, element.id)}
                className={element.id} name={element.name} 
                key={index} />
      }, this);
    },
    render: function() {
        return (
                <div className="row">
                  {this._getButtonsFormatted()}                  
                </div>
        );
    }
});

module.exports = ButtonsList;