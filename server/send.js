const amqp = require("amqplib/callback_api");

const message = { text: "Hello Rabbit!", timestamp: Date.now() };

amqp.connect("amqp://localhost", (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    const exchange = "logs";
    const msg = JSON.stringify(message);

    channel.assertExchange(exchange, "fanout", {
      durable: false,
    });

    channel.publish(exchange, "", Buffer.from(msg));
    console.log(`Message sent: ${msg}`);
  });

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
});
