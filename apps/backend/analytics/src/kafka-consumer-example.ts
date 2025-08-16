import {
  consumeMessages,
  createConsumer,
  gracefulShutdown,
} from "./utils/kafka";

// Example: How to consume messages from a topic
async function startConsumer() {
  const consumer = createConsumer("analytics-consumer-group");

  try {
    await consumer.connect();
    console.log("Consumer connected");

    // Example message handler
    const messageHandler = async (payload: any) => {
      const message = payload.message;
      console.log("Received message:", {
        topic: payload.topic,
        partition: payload.partition,
        offset: message.offset,
        key: message.key?.toString(),
        value: message.value?.toString(),
        headers: message.headers,
      });

      // Your business logic here
      // e.g., save to database, send email, etc.
    };

    // Start consuming from 'user-events' topic
    await consumeMessages(consumer, "user-events", messageHandler);
  } catch (error) {
    console.error("Error in consumer:", error);
    await gracefulShutdown(consumer);
  }
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("Received SIGINT, shutting down gracefully...");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Received SIGTERM, shutting down gracefully...");
  process.exit(0);
});

// Start the consumer (uncomment to run)
// startConsumer().catch(console.error);

export { startConsumer };
