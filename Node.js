// Node.js
const WebSocket = require('ws');

class Node {
    constructor(id) {
        this.id = id;
        this.processes = [];
        this.sharedResources = {};
        this.active = true;
        this.ws = new WebSocket('ws://localhost:3000');
        this.messageQueue = [];

        this.ws.on('open', () => {
            console.log(`Node ${this.id} connected to WebSocket server`);
            this.ws.send(`Node ${this.id} is online`);
            this.flushMessageQueue();
        });

        this.ws.on('message', (message) => {
            console.log(`Node ${this.id} received: ${message}`);
            // Handle incoming messages and potentially trigger actions
        });
    }

    flushMessageQueue() {
        while (this.messageQueue.length > 0 && this.ws.readyState === WebSocket.OPEN) {
            const message = this.messageQueue.shift();
            this.ws.send(message);
        }
    }

    sendMessage(message) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(message);
        } else {
            console.log(`WebSocket is not open. Queuing message: ${message}`);
            this.messageQueue.push(message);
        }
    }

    executeProcess(process) {
        console.log(`Node ${this.id} executing process ${process.id}`);
        this.processes.push(process);
        process.execute();
        this.sendMessage(`Node ${this.id} started process ${process.id}`);
    }

    accessResource(resourceId, callback) {
        if (!this.sharedResources[resourceId]) {
            this.sharedResources[resourceId] = false;
        }

        const tryAccess = () => {
            if (!this.sharedResources[resourceId]) {
                this.sharedResources[resourceId] = true;
                this.sendMessage(`Node ${this.id} accessing resource ${resourceId}`);
                callback(() => {
                    this.sharedResources[resourceId] = false;
                    this.sendMessage(`Node ${this.id} released resource ${resourceId}`);
                });
            } else {
                setTimeout(tryAccess, 100);
            }
        };

        tryAccess();
    }

    fail() {
        this.sendMessage('Node failed');
        this.active = false;
    }

    recover() {
        this.active = true;
        console.log(`Node ${this.id} has recovered.`);
        this.sendMessage(`Node ${this.id} has recovered`);
    }
}

module.exports = Node;
