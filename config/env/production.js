module.exports = {
  DB: process.env.DB || 'mongodb://xinfintwitterdbprod:quietfox88@xinfin-twitter-db-prod.cluster-cscjrof24gyr.us-east-1.docdb.amazonaws.com:27017/speedTest',
  PORT: process.env.PORT || '3004',
  IS_CONSOLE_LOG: process.env.IS_CONSOLE_LOG || 'true',
  AMQP_HOST_URL: process.env.AMQP_HOST_URL || 'amqps://xinfintwittermqprod:fast558sound68@b-7348d66c-0d67-4f57-9904-5afeeb2b9f1f.mq.us-east-1.amazonaws.com:5671',
  AMQP_TWITTER_EXCHANGE: process.env.AMQP_TWITTER_EXCHANGE || 'xinfin-twitter-trending-topic-exchange',
  AMQP_TWITTER_QUEUE: process.env.AMQP_TWITTER_QUEUE || 'xinfin-twitter-trending-topic-queue',
  AMQP_TWITTER_OPERATION: process.env.AMQP_TWITTER_OPERATION || 'xinfin_extractor_data_ops',
  TWITTER_API_URL: process.env.TWITTER_API_URL || 'https://api.twitter.com/1.1/trends/place.json',
  TWITTER_TOKEN: process.env.TWITTER_TOKEN || 'AAAAAAAAAAAAAAAAAAAAAEn5TQEAAAAA9b%2BEaMc8DSH55spAfTUbypyyuNI%3DfMvcdpBBU0pqBfsLgtvICwUqBuctIAAdMxafokFH1tF0vHjIGz',
  TWITTER_KEYWORDS: process.env.TWITTER_KEYWORDS || "",
  TWEET_COUNT: process.env.TWEET_COUNT || "",
  CRON_TIME: process.env.CRON_TIME || 1000,
  RDS_FILE: process.env.RDS_FILE || "speedtest-rds-combined-ca-bundle-prod.pem",
};
