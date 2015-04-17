'use strict';

jest.dontMock('../../public/scripts/logic/Game');
var Game = require('../../public/scripts/logic/Game');

var game;
    
beforeEach(function () {
    game = new Game();
});

describe('getWinner', function() {
    it('userMovement: spock, computerMovement: scissors User wins', function () {

        var result = game.getWinner('spock','scissors');

        expect(result).toBe('user');
    });
    
    it('userMovement: rock, computerMovement: paper Computer Wins', function () {

        var result = game.getWinner('rock','paper');

        expect(result).toBe('computer');
    });

    it('userMovement: spock, computerMovement: lizard Computer Wins', function () {

        var result = game.getWinner('spock','lizard');

        expect(result).toBe('computer');
    });

    it('userMovement: scissors, computerMovement: rock Computer Wins', function() {

        var result = game.getWinner('scissors', 'rock');

        expect(result).toBe('computer');
    });

    it('userMovement: scissors computerMovement: scissors', function() {

        var result = game.getWinner('scissors', 'scissors');

        expect(result).toBe('draw');
    });
});
