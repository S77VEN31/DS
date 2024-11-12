const Node = require('./Node');

class DistributedSystem {
    constructor() {
        this.nodes = [];
    }

    addNode(node) {
        this.nodes.push(node);
        console.log(`Node ${node.id} added to the system.`);
    }

    assignProcess(process) {
        const activeNodes = this.nodes.filter(node => node.active);
        if (activeNodes.length === 0) {
            console.log('No active nodes available.');
            return;
        }

        const node = activeNodes.reduce((prev, curr) => prev.processes.length < curr.processes.length ? prev : curr);
        node.executeProcess(process);
    }

    redistributeProcesses(failedNode) {
        failedNode.processes.forEach(process => this.assignProcess(process));
        failedNode.processes = [];
    }

    monitorNodes() {
        setInterval(() => {
            this.nodes.forEach(node => {
                if (!node.active) {
                    this.redistributeProcesses(node);
                }
            });
        }, 1000);
    }
}

module.exports = DistributedSystem;
