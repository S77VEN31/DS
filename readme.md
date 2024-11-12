

# Distributed System Emulator

This project simulates a distributed operating system, allowing resource and process management across a network of interconnected nodes. Each node represents a basic OS instance capable of processing, communication, and synchronization with other nodes. The emulator supports process distribution and fault tolerance.

## Objectives

1. **Resource & Process Management**: Apply distributed systems concepts to manage resources and processes.
2. **Node Communication & Synchronization**: Implement communication and synchronization mechanisms.
3. **Scalability & Fault Tolerance**: Evaluate system performance under different load conditions and simulated faults.

## Functional Requirements

### Node Capabilities

- **Process Management**: Nodes execute processes and allow dynamic assignment.
- **Shared Resource Management**: Coordinate access to shared resources, avoiding race conditions.
- **Node Synchronization**: Synchronize access to shared resources.
- **Fault Handling**: Detect inactive nodes and reassign their processes.

### Network Capabilities

- **Inter-Node Communication**: Nodes communicate state, resource availability, and process assignments.
- **Dynamic Process Assignment**: Transfer processes between nodes based on load or faults.
- **Load Balancing**: Distribute processes evenly.
- **Scalability**: Support adding new nodes without downtime.
- **Fault Tolerance**: Redistribute processes if a node fails.

## Use Cases

1. **Process Assignment to Node**: Allocate processes based on node load.
2. **Shared Resource Synchronization**: Ensure mutual exclusion when accessing resources.
3. **Node Failure Handling**: Detect node failure and reassign its processes.

## Testing

1. **Process Assignment & Load Balancing**: Verify that processes are allocated to the least-loaded node.
2. **Shared Resource Synchronization**: Confirm only one node accesses a shared resource at a time.
3. **Fault Management**: Test process redistribution upon node failure.
4. **System Scalability**: Add nodes and verify seamless integration.
5. **Automatic Process Redistribution**: Redistribute processes when a node is at capacity.

## Deliverables

- **Source Code**: Documented emulator code.
- **Testing Documentation**: Use cases with test results.
- **Design Documentation**: Details on architecture, communication, synchronization, and fault management.

## Evaluation Criteria

| Criterion                             | Excellent (5)             | Good (3-4)          | Insufficient (1-2)                      |
| ------------------------------------- | ------------------------- | ------------------- | --------------------------------------- |
| Distributed Mechanisms Implementation | Efficient, complete       | Some inefficiencies | Issues in communication/synchronization |
| Resource Synchronization Efficiency   | No conflicts              | Minor issues        | Significant failures                    |
| Fault Tolerance                       | Error-free redistribution | Minor errors/delays | Redistribution failure                  |
| Documentation                         | Clear & comprehensive     | Basic details       | Missing important details               |
