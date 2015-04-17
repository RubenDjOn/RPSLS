/** @jsx React.DOM */

var React = require('react');

var CoordinatesPanel = React.createClass({
    propTypes: {
        x: React.PropTypes.number,
        y: React.PropTypes.number
    },
    getDefaultProps: function() {
            return {
                x: 0,
                y: 0
            };
        },    
    render: function() {
        return (
            <div className="row">
                <div className="small-6 columns">{this.props.x}</div>
                <div className="small-6 columns">{this.props.y}</div>
            </div>
        );
    }
});

module.exports = CoordinatesPanel;