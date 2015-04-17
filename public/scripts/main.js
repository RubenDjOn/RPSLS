'use strict'; 

var React = require('react'),    
    //injectTapEventPlugin = require("react-tap-event-plugin"),
    App = require('./App.react');

//injectTapEventPlugin();

React.render(    
    <App />,
    document.getElementById('game-board')
    );