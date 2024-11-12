import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const client = new PrismaClient();
const TOPIC_NAME = 'zap-events';
const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
});

async function processOutbox() {
    const producer = kafka.producer();
    await producer.connect();

    try {
        while (true) {
            // Get the entries from the db
            const pendingRows = await client.zapRunOutbox.findMany({
                where: {},
                take: 10
            });

            if (pendingRows.length > 0) {
                // Send it to Kafka queue
                await producer.send({
                    topic: TOPIC_NAME,
                    messages: pendingRows.map(r => ({
                        value: JSON.stringify(r.zapRunId)
                    }))
                });

                // Delete it from the entry/db
                await client.zapRunOutbox.deleteMany({
                    where: {
                        id: {
                            in: pendingRows.map(r => r.id)
                        }
                    }
                });
            }

            // Delay for a short period to prevent high CPU usage
            await new Promise(resolve => setTimeout(resolve, 3000)); // 3 second delay
        }
    } catch (error) {
        console.error("Error processing outbox:", error);
    } finally {
        await producer.disconnect();
        await client.$disconnect();
    }
}

processOutbox();
