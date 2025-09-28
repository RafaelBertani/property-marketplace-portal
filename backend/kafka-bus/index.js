const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "kafka-bus",
  brokers: ["kafka:9092"],
});

module.exports = kafka;