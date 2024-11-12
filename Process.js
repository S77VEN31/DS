// Process.js
class Process {
    constructor(id) {
        this.id = id;
    }

    execute() {
        console.log(`Process ${this.id} is running.`);
    }
}

module.exports = Process;
