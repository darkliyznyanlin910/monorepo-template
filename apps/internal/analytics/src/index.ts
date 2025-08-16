import type { EachMessagePayload } from "kafkajs";

import {
  consumer,
  disconnectKafka,
  initConsumer,
  initProducer,
  subscribeToTopic,
} from "./kafka";

async function main() {
  console.log("Starting Analytics Service...");

  try {
    // Initialize Kafka connections
    await initProducer();
    await initConsumer();

    // Example: Subscribe to a topic (adjust topic name as needed)
    await subscribeToTopic("auth.public.sessions");

    // Start consuming messages
    await consumer.run({
      eachMessage: async ({
        topic,
        partition,
        message,
      }: EachMessagePayload) => {
        console.log({
          topic,
          partition,
          offset: message.offset,
          key: message.key?.toString(),
          value: message.value?.toString(),
        });

        // Process analytics message here
        // Add your analytics logic
      },
    });

    // Example: Send a test message
    // await sendMessage("analytics-events", [
    //   { value: JSON.stringify({ event: "service_started", timestamp: Date.now() }) }
    // ]);

    console.log("Analytics service is running...");
  } catch (error) {
    console.error("Failed to start analytics service:", error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("Received SIGTERM, shutting down gracefully...");
  await disconnectKafka();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("Received SIGINT, shutting down gracefully...");
  await disconnectKafka();
  process.exit(0);
});

main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
