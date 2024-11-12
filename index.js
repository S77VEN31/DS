const DistributedSystem = require('./DistributedSystem');
const Node = require('./Node');
const Process = require('./Process');

const system = new DistributedSystem();
const node1 = new Node(1);
const node2 = new Node(2);

system.addNode(node1);
system.addNode(node2);

const process1 = new Process(1);
const process2 = new Process(2);

system.assignProcess(process1);
system.assignProcess(process2);

node1.fail(); // Simulate node failure
system.monitorNodes(); // Start monitoring nodes

// Simulate resource access
node2.accessResource('resource1', (release) => {
    console.log('Node 2 accessing resource 1');
    setTimeout(() => {
        console.log('Node 2 releasing resource 1');
        release();
    }, 2000);
});
