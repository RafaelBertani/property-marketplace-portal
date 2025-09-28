const pool = require('./database/databaseConfig');
const kafka = require("../kafka-bus/index.js");

async function startConsumer() {
  const consumer = kafka.consumer({ groupId: "property-service" });

  await consumer.connect();
  await consumer.subscribe({ topic: "user-events", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = message.key.toString();
      const data = JSON.parse(message.value.toString());

      if (event === "USER_DELETED") {
        const { userId } = data;
        console.log(`🗑️ Excluindo propriedades do usuário ${userId}`);

        try {
          await pool.query(
            "DELETE FROM images WHERE property_id IN (SELECT id FROM properties WHERE user_id = $1)",
            [userId]
          );
          await pool.query("DELETE FROM properties WHERE user_id = $1", [userId]);
        } catch (err) {
          console.error("Erro ao excluir propriedades:", err);
        }
      }
    },
  });
}

module.exports = startConsumer;
