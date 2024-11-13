const DistributedSystem = require('./DistributedSystem');
const Node = require('./Node');
const Process = require('./Process');

const NUM_NODES = 3; // Define the number of nodes
const NUM_PROCESSES = 3; // Define the number of processes

const system = new DistributedSystem();
const nodes = [];
const processes = [];

// Dynamically create and add nodes
for (let i = 1; i <= NUM_NODES; i++) {
    const node = new Node(i);
    nodes.push(node);
    system.addNode(node);
}

// Dynamically create processes
for (let i = 1; i <= NUM_PROCESSES; i++) {
    const process = new Process(i);
    processes.push(process);
    system.assignProcess(process);
}

// Simulate node failure for the first node
nodes[0].fail();
system.monitorNodes(); // Start monitoring nodes

function accessResourceDynamically(node, resourceId, duration) {
    node.accessResource(resourceId, (release) => {
        console.log(`Node ${node.id} accessing resource ${resourceId}`);
        setTimeout(() => {
            console.log(`Node ${node.id} releasing resource ${resourceId}`);
            release();
        }, duration);
    });
}

// Example usage
accessResourceDynamically(nodes[1], 'resource1', 2000);
accessResourceDynamically(nodes[2], 'resource2', 3000);
