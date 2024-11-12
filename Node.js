// Node.js
class Node {
    constructor(id) {
        this.id = id;
        this.processes = [];
        this.sharedResources = {};
        this.active = true;
    }

    executeProcess(process) {
        console.log(`Node ${this.id} executing process ${process.id}`);
        this.processes.push(process);
        process.execute();
    }

    accessResource(resourceId, callback) {
        if (!this.sharedResources[resourceId]) {
            this.sharedResources[resourceId] = false;
        }

        const tryAccess = () => {
            if (!this.sharedResources[resourceId]) {
                this.sharedResources[resourceId] = true;
                callback(() => {
                    this.sharedResources[resourceId] = false;
                });
            } else {
                setTimeout(tryAccess, 100);
            }
        };

        tryAccess();
    }

    fail() {
        this.active = false;
        console.log(`Node ${this.id} has failed.`);
    }

    recover() {
        this.active = true;
        console.log(`Node ${this.id} has recovered.`);
    }
}

module.exports = Node;
