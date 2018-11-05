class MessageDispatcher {
    constructor() {
        this.listeners = {};
        this.broadcastAction = null;
    }

    handleMessage(message) {
        console.log('handleMessage', message);
        var messageType = message.type;
        if(this.listeners.hasOwnProperty(messageType)) {
            var i;
            for(i = 0; i < this.listeners[messageType].length; i++) {
                this.broadcastAction(this.listeners[messageType][i](message));
            }
        }
    }

    sendBroadcastAction(callback) {
        this.broadcastAction = callback;
    }

    registerListener(messageType, callback) {
        if(!this.listeners.hasOwnProperty(messageType))
            this.listeners[messageType] = [];
        this.listeners[messageType].push(callback);
    }
}
module.exports = MessageDispatcher;