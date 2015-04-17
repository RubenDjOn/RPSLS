'use strict';

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
