import { Kafka } from "kafkajs";

import { createKafkaClient, KafkaClientOptions } from "./client";
import { ConsumerOptions, KafkaConsumer } from "./consumer";
import { KafkaProducer, ProducerOptions } from "./producer";

export class KafkaManager {
  private kafka: Kafka;
  private producers: Map<string, KafkaProducer> = new Map();
  private consumers: Map<string, KafkaConsumer> = new Map();

  constructor(options: KafkaClientOptions) {
    this.kafka = createKafkaClient(options);
  }

  createProducer(name: string, options: ProducerOptions = {}): KafkaProducer {
    if (this.producers.has(name)) {
      return this.producers.get(name)!;
    }

    const producer = new KafkaProducer(this.kafka, options);
    this.producers.set(name, producer);
    return producer;
  }

  createConsumer(name: string, options: ConsumerOptions): KafkaConsumer {
    if (this.consumers.has(name)) {
      return this.consumers.get(name)!;
    }

    const consumer = new KafkaConsumer(this.kafka, options);
    this.consumers.set(name, consumer);
    return consumer;
  }

  async disconnectAll(): Promise<void> {
    const promises: Promise<void>[] = [];

    // Disconnect all producers
    for (const producer of this.producers.values()) {
      if (producer.isConnected()) {
        promises.push(producer.disconnect());
      }
    }

    // Disconnect all consumers
    for (const consumer of this.consumers.values()) {
      if (consumer.isConnected()) {
        promises.push(consumer.disconnect());
      }
    }

    await Promise.all(promises);

    this.producers.clear();
    this.consumers.clear();
  }

  getProducer(name: string): KafkaProducer | undefined {
    return this.producers.get(name);
  }

  getConsumer(name: string): KafkaConsumer | undefined {
    return this.consumers.get(name);
  }

  getKafkaClient(): Kafka {
    return this.kafka;
  }
}
