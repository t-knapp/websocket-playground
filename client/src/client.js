$(function () {
    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    var connection = new WebSocket('ws://192.168.178.32:1337');

    connection.onopen = function () {
        // connection is opened and ready to use
        console.log('onopen');
    };

    connection.onclose = function() {
        console.log('onclose');
    }

    connection.onerror = function (error) {
        // an error occurred when sending/receiving data
        console.error('onerror');
    };

    connection.onmessage = function (message) {
        // try to decode json (I assume that each message
        // from server is json)
        try {
            //console.log('message', message);
            var json = JSON.parse(message.data);
            setValue(json.ValueVal);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ',
                message.data);
        return;
        }
        // handle incoming message
    };

    var increment = function() {
        connection.send(JSON.stringify({type: 'ValueInc'}));
    };

    var decrement = function() {
        connection.send(JSON.stringify({type: 'ValueDec'}));
    };

    var setValue = function(value) {
        $('#value').text(value);
    };

    $('#inc').on('click', increment);
    $('#dec').on('click', decrement);
});