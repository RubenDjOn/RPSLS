/** @jsx React.DOM */

jest.dontMock('../../public/scripts/components/Button.react');

var React =  require('react/addons'),
    TestUtils = React.addons.TestUtils,
    Button = require('../../public/scripts/components/Button.react');;  

describe('Buttons Names', function() {    

    it('When button "Paper" is created, the name should be "Paper"', function() {
        var buttonRendered = TestUtils.renderIntoDocument(
            <Button name="Paper" />
        );
        
        expect(buttonRendered.props.name).toBe('Paper');

    });

    it('When button "Rock" is created, the name should be "Rock"', function() {
        var buttonRendered = TestUtils.renderIntoDocument(
            <Button name="Rock" />
        );
        
        expect(buttonRendered.props.name).toBe('Rock');

    });
});
