import { Consumer, EachMessagePayload, Kafka, Producer } from "kafkajs";

import { getKafkaConfig } from "@repo/service-discovery";

import { env } from "../env";

// Initialize Kafka client
const kafka = new Kafka({
  clientId: "analytics-service",
  brokers: [...getKafkaConfig(env.NODE_ENV).brokers],
  retry: {
    initialRetryTime: 100,
    retries: 8,
  },
});

// Create producer instance
export const createProducer = (): Producer => {
  return kafka.producer({
    maxInFlightRequests: 1,
    idempotent: true,
    transactionTimeout: 30000,
  });
};

// Create consumer instance
export const createConsumer = (groupId: string): Consumer => {
  return kafka.consumer({
    groupId,
    sessionTimeout: 30000,
    heartbeatInterval: 3000,
  });
};

// Helper function to consume messages with error handling
export const consumeMessages = async (
  consumer: Consumer,
  topic: string,
  messageHandler: (payload: EachMessagePayload) => Promise<void>,
) => {
  await consumer.subscribe({ topic, fromBeginning: false });

  await consumer.run({
    eachMessage: async (payload) => {
      try {
        console.log(
          `Processing message from topic: ${payload.topic}, partition: ${payload.partition}, offset: ${payload.message.offset}`,
        );
        await messageHandler(payload);
      } catch (error) {
        console.error("Error processing message:", error);
        // Add your error handling logic here (dead letter queue, retry, etc.)
      }
    },
  });
};

// Helper function to produce messages with error handling
export const produceMessage = async (
  producer: Producer,
  topic: string,
  message: { key?: string; value: string; headers?: Record<string, string> },
) => {
  try {
    const result = await producer.send({
      topic,
      messages: [message],
    });
    console.log("Message sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// Graceful shutdown helper
export const gracefulShutdown = async (
  consumer?: Consumer,
  producer?: Producer,
) => {
  console.log("Shutting down Kafka clients...");

  if (consumer) {
    await consumer.disconnect();
  }

  if (producer) {
    await producer.disconnect();
  }

  console.log("Kafka clients disconnected");
};

// Export the kafka instance for advanced usage
export { kafka };
