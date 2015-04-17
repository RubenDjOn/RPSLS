'use strict';

/** @jsx React.DOM */

jest.dontMock('../../public/scripts/components/Card.react');

var React =  require('react/addons'),
    TestUtils = React.addons.TestUtils,
    Card = require('../../public/scripts/components/Card.react');

describe('User select a movement', function() {
    it('should set card className to "user-card-rock"', function () {
        var cardRendered = TestUtils.renderIntoDocument(
                                <Card movement="rock" player="user" />
                            );

        result = cardRendered._getClassName();

        expect(result).toBe("user-card-rock");
    });
    it('should set card className to "computer-card-paper"', function () {
        var cardRendered = TestUtils.renderIntoDocument(
                                <Card movement="paper" player="computer" />
                            );

        result = cardRendered._getClassName();

        expect(result).toBe("computer-card-paper"); 
    });
    it('should set card className to "computer-card-lizard"', function () {
       var cardRendered = TestUtils.renderIntoDocument(
                                <Card movement="lizard" player="computer" />
                            );

        result = cardRendered._getClassName();

        expect(result).toBe("computer-card-lizard");  
    });
});