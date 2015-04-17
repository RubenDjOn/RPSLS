'use strict';

/** @jsx React.DOM */
var React = require('react');

var Button = require('./Button.react');

var ButtonsList = React.createClass({
    
    propTypes: {
      buttons: React.PropTypes.array,
      _getButtonsFormated: React.PropTypes.func,
      _onButtonSelected: React.PropTypes.func
    },
    _getButtonsFormatted: function(){       
      return this.props.buttons.map(function(element, index){
        return <li key={index}>
                  <Button _onClick={this.props._onButtonSelected.bind(null, element.id)}
                  className={element.id+' '+element.class} name={element.name} />
                </li>
      }, this);
    },
    render: function() {
        return (
                <div className="small-12 columns text-center">
                  <ul className="button-group radious stack-for-small">
                    {this._getButtonsFormatted()}
                    </ul>
                </div>
        );
    }
});

module.exports = ButtonsList;