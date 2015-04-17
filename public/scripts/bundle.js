(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function classNames() {
	var classes = '';
	var arg;

	for (var i = 0; i < arguments.length; i++) {
		arg = arguments[i];
		if (!arg) {
			continue;
		}

		if ('string' === typeof arg || 'number' === typeof arg) {
			classes += ' ' + arg;
		} else if (Object.prototype.toString.call(arg) === '[object Array]') {
			classes += ' ' + classNames.apply(null, arg);
		} else if ('object' === typeof arg) {
			for (var key in arg) {
				if (!arg.hasOwnProperty(key) || !arg[key]) {
					continue;
				}
				classes += ' ' + key;
			}
		}
	}
	return classes.substr(1);
}

// safely export classNames in case the script is included directly on a page
if (typeof module !== 'undefined' && module.exports) {
	module.exports = classNames;
}

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

/** @jsx React.DOM */

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var ButtonsList = require('./components/ButtonsList.react'),
    CoordinatesPanel = require('./components/CoordinatesPanel.react'),
    Alert = require('./components/Alert.react'),
    Card = require('./components/Card.react'),
    Scoreboard = require('./components/Scoreboard.react'),
    Game = require('./logic/Game');
    /*mui = require('material-ui'),
    FlatButton = mui.FlatButton;*/

var App = React.createClass({displayName: "App",

    propTypes: {
        buttons: React.PropTypes.array,                
       _onMouseMove: React.PropTypes.func,
       _onButtonSelected: React.PropTypes.func,
       _getUserMovement: React.PropTypes.func,
       _setUserMovement: React.PropTypes.func,       
       _getComputerMovement: React.PropTypes.func,
       _setComputerMovement: React.PropTypes.func,
       _increaseScore: React.PropTypes.func,
    },    
    getDefaultProps: function(){
        return {
            buttons: [
                {'id':'rock','name':'Rock', 'class':'small warning'},
                {'id':'paper', 'name': 'Paper', 'class':'small info'},
                {'id':'scissors', 'name': 'Scissors', 'class':'small secondary'},
                {'id':'lizard', 'name': 'Lizard', 'class':'small success'},
                {'id':'spock', 'name': 'Spock', 'class':'small '},
            ]
        };        
    },
    getInitialState: function() {
        return {
            x: 0,
            y: 0,
            game: new Game(),            
            userMovement: '',
            computerMovement: '',
            winner: '',
            userScore: 0,
            computerScore: 0,
        };
    },
    _onMouseMove: function(event){
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    },
    _onButtonSelected: function(buttonId){
        var computerMovement = this.state.game.getRandomMovement(),
            winner = this.state.game.getWinner(buttonId, this._getComputerMovement(computerMovement));

        this._increaseScore(winner);

        this.setState({
            userMovement: buttonId,
            computerMovement: computerMovement,          
            winner: winner            
        });
    },
    _getUserMovement: function(){
        return this.state.userMovement;        
    },
    _setUserMovement: function(userMovement){        
        this.setState({
            userMovement: userMovement
        });
    },
    _setComputerMovement: function(){    
        var computerMovement = this.state.game.getRandomMovement();

        this.setState({
            computerMovement: computerMovement
        });
    },
    _getComputerMovement: function(computerMovement){        
        return computerMovement;        
    },
    _increaseScore: function(winner){
        if(winner=='user'){
            this.state.userScore+=1;
        }
        else if(winner=='computer'){
            this.state.computerScore+=1;
        }
    },
    render: function() {
        return (
            React.createElement("div", {onMouseMove: this._onMouseMove}, 
                React.createElement(Scoreboard, {userScore: this.state.userScore, 
                                computerScore: this.state.computerScore}), 
                React.createElement(Alert, {winner: this.state.winner}), 
                React.createElement("div", {className: "small-12 columns"}, 
                    React.createElement("ul", {className: "small-block-grid-4"}, 
                        React.createElement("li", {key: 1}, " "), 
                        React.createElement("li", {key: 2}, React.createElement(Card, {movement: this._getUserMovement(), player: "user"})), 
                        React.createElement("li", {key: 3}, React.createElement(Card, {movement: this._getComputerMovement(this.state.computerMovement), player: "computer"})), 
                        React.createElement("li", {key: 4}, " ")
                    )
                ), 
                React.createElement(ButtonsList, {buttons: this.props.buttons, _onButtonSelected: this._onButtonSelected}), 
                React.createElement(CoordinatesPanel, {x: this.state.x, y: this.state.y})
            )
        );
    }

});


module.exports = App;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./components/Alert.react":3,"./components/ButtonsList.react":5,"./components/Card.react":6,"./components/CoordinatesPanel.react":7,"./components/Scoreboard.react":8,"./logic/Game":9}],3:[function(require,module,exports){
(function (global){
'use strict';
/** @jsx React.DOM */

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);
var classNames = require('classnames');

var Alert = React.createClass({displayName: "Alert",
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
            React.createElement("div", {className: "small-12 columns"}, 
              React.createElement("div", {"data-alert": true, className: classes}, 
                React.createElement("h4", null, "El ganador de esta ronda es ", React.createElement("b", null, this.props.winner))
              )
            )            
        );
    }

});

module.exports = Alert;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":1}],4:[function(require,module,exports){
(function (global){
'use strict';
/** @jsx React.DOM */

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var Button = React.createClass({displayName: "Button",
    
    propTypes: {
        name: React.PropTypes.string,
        className: React.PropTypes.string,
        _onClick: React.PropTypes.func        
    },
    render: function() {
        return (
            React.createElement("button", {onClick: this.props._onClick, 
                    className: this.props.className}, this.props.name)
        );
    }
});

module.exports = Button;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
'use strict';

/** @jsx React.DOM */
var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var Button = require('./Button.react');

var ButtonsList = React.createClass({displayName: "ButtonsList",
    
    propTypes: {
      buttons: React.PropTypes.array,
      _getButtonsFormated: React.PropTypes.func,
      _onButtonSelected: React.PropTypes.func
    },
    _getButtonsFormatted: function(){       
      return this.props.buttons.map(function(element, index){
        return React.createElement("li", {key: index}, 
                  React.createElement(Button, {_onClick: this.props._onButtonSelected.bind(null, element.id), 
                  className: element.id+' '+element.class, name: element.name})
                )
      }, this);
    },
    render: function() {
        return (
                React.createElement("div", {className: "small-12 columns text-center"}, 
                  React.createElement("ul", {className: "button-group radious stack-for-small"}, 
                    this._getButtonsFormatted()
                    )
                )
        );
    }
});

module.exports = ButtonsList;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Button.react":4}],6:[function(require,module,exports){
(function (global){
'use strict';
/** @jsx React.DOM */

var tools = require('../tools/utils.js');

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var Card = React.createClass({displayName: "Card",
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
            React.createElement("div", null, 
                React.createElement("h1", {className: "text-center"}, React.createElement("small", null, this.props.player.capitalizeFirstLetter())), 
                React.createElement("div", {className: this._getClassName(), 
                    style: this._getCardStyle()}
                ), 
                React.createElement("h2", {className: "movement-text text-center"}, this.props.movement.capitalizeFirstLetter())
            )
        );
    }

});

module.exports = Card;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../tools/utils.js":11}],7:[function(require,module,exports){
(function (global){
/** @jsx React.DOM */

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var CoordinatesPanel = React.createClass({displayName: "CoordinatesPanel",
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
            React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "small-6 columns"}, this.props.x), 
                React.createElement("div", {className: "small-6 columns"}, this.props.y)
            )
        );
    }
});

module.exports = CoordinatesPanel;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
(function (global){
'use strict';
/** @jsx React.DOM */

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

var Scoreboard = React.createClass({displayName: "Scoreboard",
    propTypes: {
        userScore: React.PropTypes.number,
        computerScore: React.PropTypes.number,
        userClassName: React.PropTypes.string,
        computerClassName: React.PropTypes.string,
    },
    render: function() {
        return (
            React.createElement("div", {className: "small-12 columns"}, 
                React.createElement("ul", {className: "button-group even-2"}, 
                React.createElement("li", {id: 1, className: "button small secondary"}, React.createElement("strong", null, "Player"), " ", 
                    React.createElement("span", {className: "user-score"}, this.props.userScore)
                ), 
                React.createElement("li", {id: 2, className: "button small secondary"}, React.createElement("strong", null, "Computer"), " ", 
                    React.createElement("span", {className: "computer-score"}, this.props.computerScore)
                )
                )
            )
        );
    }

});

module.exports = Scoreboard;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

module.exports = function Game(){

    this.loserMovements = {
        'rock' : ['paper','spock'],
        'paper' : ['scissors','lizard'],
        'scissors' : ['rock','spock'],
        'lizard' : ['rock','scissors'],
        'spock' : ['paper','lizard']
    };

    this.getRandomMovement = function(){
        var keys = Object.keys(this.loserMovements);
        return keys[Math.floor(Math.random()*keys.length)];
    };

    this.getWinner = function(userMovement, computerMovement){
        var winner = 'user';
        
        if(this._userLostMovement(userMovement, computerMovement)){
            winner = 'computer';
        }
        else if(userMovement==computerMovement){
            winner = 'draw';            
        }
        
        return winner;
    };

    this._userLostMovement = function(userMovement, computerMovement){        
        return (this.loserMovements[userMovement].indexOf(computerMovement)!=-1);
    };
};


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(require,module,exports){
(function (global){
'use strict'; 

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null),    
    //injectTapEventPlugin = require("react-tap-event-plugin"),
    App = require('./App.react');

//injectTapEventPlugin();

React.render(    
    React.createElement(App, null),
    document.getElementById('game-board')
    );

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./App.react":2}],11:[function(require,module,exports){
'use strict';

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

},{}]},{},[10]);
