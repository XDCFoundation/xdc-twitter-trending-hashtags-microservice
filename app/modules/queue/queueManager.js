import AMQPController from "../../../library/index";
import Config from "../../../config";
import { amqpConstants } from "../../common/constants";
import BlockChainController from "../trendingHashtag/index";

export default class RabbitMQ {
  async insertInQueue(exchangeName, queueName, replyQueue, topicKey, routingKey, replyKey, requestKey, exchangeType, queueType, queueData) {
    return await AMQPController.insertInQueue(exchangeName, queueName,
      replyQueue,
      topicKey,
      routingKey,
      replyKey,
      requestKey,
      exchangeType,
      queueType,
      queueData
    );
  }

    async initializeRabbitMQListener() {
      await AMQPController.getFromQueue(Config.XINFIN_TWITTER_EXCHANGE, Config.XINFIN_TWITTER_QUEUE, amqpConstants.exchangeType.FANOUT, amqpConstants.queueType.PUBLISHER_SUBSCRIBER_QUEUE, this.blockchainData, {}, {}, true, true, false, false, true, 20);
        return true;
    }

  async blockchainData(queueData, data) {
    if (!data) return;
    let newData = JSON.parse(data);
    console.log("newData",newData);
    try {
     // await new BlockChainController().writeToBlockChain(newData);
    } catch (err) {
      console.log("blockQueueListener catch", err);
    }
  }
}
