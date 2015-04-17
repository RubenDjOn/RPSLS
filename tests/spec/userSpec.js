'use strict';
/** @jsx React.DOM */

/****
REFACTORIZAR PARA PASAR ESTOS TEST A UNIT TEST
AQUÍ HACER ÚNICAMENTE LOS TEST DE ACEPTACIÓN
EL USUARIO HACE CLICK Y SE COMPRUEBA LA SALIDA EN EL NAVEGADOR

NO TENGO MUY CLARO COMO HACERLO
*/

//mock the DOM
require('./testdom')('<html><body></body></html>');

var React =  require('react/addons'),
    TestUtils = React.addons.TestUtils,
    sinon = require('sinon'),
    expect = require('chai').expect,
    App = require('../../public/scripts/App.react'),
    container;
    

beforeEach(function () {
    container = TestUtils.renderIntoDocument(<App />);
});

describe('User input', function() {
    describe('User select a movement', function() {
        it('should set the movement to "spock"', function () {
            var userMovement = 'spock',
                button = TestUtils.findRenderedDOMComponentWithClass(container, userMovement);

            TestUtils.Simulate.click(button.getDOMNode());

            expect(container._getUserMovement()).to.equal(userMovement);

        });
        it('should see the user card of the spock movement', function () {
            var userMovement = 'spock',
                button = TestUtils.findRenderedDOMComponentWithClass(container, userMovement);

            TestUtils.Simulate.click(button.getDOMNode());
            var resultDOM = TestUtils.findRenderedDOMComponentWithClass(container, 'user-card-spock');

            expect(resultDOM).to.exist;            
        });
        it('should see the user card of the rock movement', function () {
            var userMovement = 'rock',
                button = TestUtils.findRenderedDOMComponentWithClass(container, userMovement);

            TestUtils.Simulate.click(button.getDOMNode());
            var resultDOM = TestUtils.findRenderedDOMComponentWithClass(container, 'user-card-rock');

            expect(resultDOM).to.exist;            
        });
        it('should see the computer card of the paper movement', function () {
            var computerMovement = 'paper',
                button = TestUtils.findRenderedDOMComponentWithClass(container, computerMovement);


            sinon.stub(container, '_getComputerMovement').returns(computerMovement);
            TestUtils.Simulate.click(button.getDOMNode());
            var resultDOM = TestUtils.findRenderedDOMComponentWithClass(container, 'computer-card-paper');

            expect(resultDOM).to.exist;            
            container._getComputerMovement.restore();
        });
        it('should see the computer card of the lizard movement', function () {
            var computerMovement = 'lizard',
                button = TestUtils.findRenderedDOMComponentWithClass(container, computerMovement);

            sinon.stub(container, '_getComputerMovement').returns(computerMovement);            
            TestUtils.Simulate.click(button.getDOMNode());
            var resultDOM = TestUtils.findRenderedDOMComponentWithClass(container, 'computer-card-lizard');

            expect(resultDOM).to.exist;
            container._getComputerMovement.restore();
        });
    });


    describe('Shows winner message when user choose a winner movement', function() {
        it('User should Win the round', function() {
            var userMovement = 'paper',
                computerMovement = 'rock',
                button = TestUtils.findRenderedDOMComponentWithClass(container, userMovement);
                
            sinon.stub(container, '_getComputerMovement').returns(computerMovement);            
            TestUtils.Simulate.click(button.getDOMNode());
            var resultDOM = TestUtils.findRenderedDOMComponentWithClass(container, 'user-wins');

            expect(resultDOM).to.exist;
            container._getComputerMovement.restore();
        });
    });

    describe('Shows Loser message when user choose a Loser movement', function() {
        it('User should Lost the round', function() {
            var userMovement = 'rock',
                computerMovement = 'paper',
                button = TestUtils.findRenderedDOMComponentWithClass(container, userMovement);
                
            sinon.stub(container, '_getComputerMovement').returns(computerMovement);            
            TestUtils.Simulate.click(button.getDOMNode());            
            var resultDOM = TestUtils.findRenderedDOMComponentWithClass(container, 'computer-wins');

            expect(resultDOM).to.exist;
            container._getComputerMovement.restore();

        });
    });

    describe('Increase the socreboard on each round', function() {
        it('should increase (+1) on the user socreboard when he wins', function () {
            var userMovement = 'rock',
                computerMovement = 'scissors',
                button = TestUtils.findRenderedDOMComponentWithClass(container, userMovement);
                
            sinon.stub(container, '_getComputerMovement').returns(computerMovement);            
            TestUtils.Simulate.click(button.getDOMNode());            
            var resultDOM = TestUtils.findRenderedDOMComponentWithClass(container, 'user-score');

            expect(resultDOM.getDOMNode().textContent).to.equal('1');
            container._getComputerMovement.restore();
        });
        it('should increase (+1) on the computer socreboard when he wins', function () {
            var userMovement = 'scissors',
                computerMovement = 'rock',
                button = TestUtils.findRenderedDOMComponentWithClass(container, userMovement);
                
            sinon.stub(container, '_getComputerMovement').returns(computerMovement);            
            TestUtils.Simulate.click(button.getDOMNode());            
            var resultDOM = TestUtils.findRenderedDOMComponentWithClass(container, 'computer-score');

            expect(resultDOM.getDOMNode().textContent).to.equal('1');
            container._getComputerMovement.restore();
        });
    });

});