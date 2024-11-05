// rabbitMQService.js
const amqp = require('amqplib');

async function receiveTransaction() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'transactionsQueue';

    await channel.assertQueue(queue, { durable: false });

    console.log("Esperando mensajes en %s", queue);
    channel.consume(queue, (msg) => {
        const transaction = JSON.parse(msg.content.toString());
        console.log("Transacción recibida:", transaction);
    }, { noAck: true });
}

async function sendTransaction(transaction) {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'transactionsQueue';

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(transaction)));
    console.log("Transacción enviada:", transaction);

    await channel.close();
    await connection.close();
}

// Ejecuta la función de recibir
receiveTransaction();
