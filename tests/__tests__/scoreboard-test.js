'use strict';

/** @jsx React.DOM */

jest.dontMock('../../public/scripts/components/Scoreboard.react');

var React =  require('react/addons'),
    TestUtils = React.addons.TestUtils,
    Scoreboard = require('../../public/scripts/components/Scoreboard.react');


describe('The score should be set', function() {

    it('should set the user score to 5', function () {
        var scoreboardRendered = TestUtils.renderIntoDocument(
            <Scoreboard userScore={5} />
        );

        result = scoreboardRendered.props.userScore; 

        expect(result).toBe(5);
    });

    it('should set the user score to 5', function () {
        var scoreboardRendered = TestUtils.renderIntoDocument(
            <Scoreboard computerScore={7} />
        );

        result = scoreboardRendered.props.computerScore; 

        expect(result).toBe(7);
    });
        
});    