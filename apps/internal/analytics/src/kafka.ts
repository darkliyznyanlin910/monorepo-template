import { Consumer, Kafka, Producer } from "kafkajs";

import { getKafkaConfig } from "@repo/service-discovery";

import { env } from "./env";

// Get the appropriate Kafka configuration based on environment
const kafkaConfig = getKafkaConfig(env.NODE_ENV);

// Create Kafka client
export const kafka = new Kafka({
  clientId: "analytics-service",
  brokers: kafkaConfig.bootstrap as string[],
  ssl: true,
  retry: {
    initialRetryTime: 100,
    retries: 8,
  },
});

// Create producer instance
export const producer: Producer = kafka.producer({
  maxInFlightRequests: 1,
  idempotent: true,
  transactionTimeout: 30000,
});

// Create consumer instance
export const consumer: Consumer = kafka.consumer({
  groupId: "analytics-group",
  sessionTimeout: 30000,
  heartbeatInterval: 3000,
});

// Helper function to initialize producer
export async function initProducer() {
  try {
    await producer.connect();
    console.log("Kafka producer connected successfully");
  } catch (error) {
    console.error("Failed to connect Kafka producer:", error);
    throw error;
  }
}

// Helper function to initialize consumer
export async function initConsumer() {
  try {
    await consumer.connect();
    console.log("Kafka consumer connected successfully");
  } catch (error) {
    console.error("Failed to connect Kafka consumer:", error);
    throw error;
  }
}

// Helper function to cleanup connections
export async function disconnectKafka() {
  try {
    await producer.disconnect();
    await consumer.disconnect();
    console.log("Kafka connections closed");
  } catch (error) {
    console.error("Error disconnecting Kafka:", error);
  }
}

// Helper function to send messages
export async function sendMessage(
  topic: string,
  messages: Array<{ key?: string; value: string; partition?: number }>,
) {
  try {
    const result = await producer.send({
      topic,
      messages,
    });
    console.log("Message sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Failed to send message:", error);
    throw error;
  }
}

// Helper function to subscribe to topics
export async function subscribeToTopic(topic: string) {
  try {
    await consumer.subscribe({ topic, fromBeginning: false });
    console.log(`Subscribed to topic: ${topic}`);
  } catch (error) {
    console.error(`Failed to subscribe to topic ${topic}:`, error);
    throw error;
  }
}
