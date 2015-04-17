'use strict';

/** @jsx React.DOM */

var React = require('react');

var ButtonsList = require('./components/ButtonsList.react'),
    CoordinatesPanel = require('./components/CoordinatesPanel.react'),
    Alert = require('./components/Alert.react'),
    Card = require('./components/Card.react'),
    Scoreboard = require('./components/Scoreboard.react'),
    Game = require('./logic/Game');
    /*mui = require('material-ui'),
    FlatButton = mui.FlatButton;*/

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
            <div onMouseMove={this._onMouseMove}>                
                <Scoreboard userScore={this.state.userScore} 
                                computerScore={this.state.computerScore} />
                <Alert winner={this.state.winner}/>
                <div className="small-12 columns">
                    <ul className="small-block-grid-4">
                        <li key={1}>&nbsp;</li>
                        <li key={2}><Card movement={this._getUserMovement()} player="user" /></li>
                        <li key={3}><Card movement={this._getComputerMovement(this.state.computerMovement)} player="computer" /></li>
                        <li key={4}>&nbsp;</li>
                    </ul>
                </div>                
                <ButtonsList buttons={this.props.buttons} _onButtonSelected={this._onButtonSelected}/>
                <CoordinatesPanel x={this.state.x} y={this.state.y} />                
            </div>
        );
    }

});


module.exports = App;