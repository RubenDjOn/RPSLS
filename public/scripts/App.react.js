'use strict';

/** @jsx React.DOM */

var React = require('react'),    
    ButtonsList = require('./components/ButtonsList.react'),
    CoordinatesPanel = require('./components/CoordinatesPanel.react'),
    Alert = require('./components/Alert.react'),
    Card = require('./components/Card.react'),
    Scoreboard = require('./components/Scoreboard.react'),
    Game = require('./logic/Game');

var App = React.createClass({

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
    //componentDidMount: function(){
    //    this.state.game.setComputerMovement('rock');
    //},
    getDefaultProps: function(){
        return {
            buttons: [
                {'id':'rock','name':'Rock'},
                {'id':'paper', 'name': 'Paper'},
                {'id':'scissors', 'name': 'Scissors'},
                {'id':'lizard', 'name': 'Lizard'},
                {'id':'spock', 'name': 'Spock'},
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
            <div onMouseMove={this._onMouseMove}>
                <ButtonsList buttons={this.props.buttons} _onButtonSelected={this._onButtonSelected}/>
                <div className="row">
                    <Scoreboard userScore={this.state.userScore} 
                                computerScore={this.state.computerScore} />
                </div>
                <div className="row">
                    <Card movement={this._getUserMovement()} player="user" />
                    <Card movement={this._getComputerMovement(this.state.computerMovement)} player="computer" />
                </div>                
                <Alert winner={this.state.winner}/>                
                <CoordinatesPanel x={this.state.x} y={this.state.y} />
            </div>
        );
    }

});


module.exports = App;