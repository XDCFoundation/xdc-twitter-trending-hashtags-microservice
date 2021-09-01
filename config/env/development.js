module.exports = {
    DB: process.env.DB || 'mongodb://xinfinLeewayhertz:leeway321@xinfin-twitter.cluster-ckjj5obhzs40.us-east-2.docdb.amazonaws.com:27017',
    PORT: process.env.PORT || '3000',
    IS_CONSOLE_LOG: process.env.IS_CONSOLE_LOG || 'true',
    AMQP_HOST_URL: process.env.AMQP_HOST_URL || 'amqps://xinfintwitter:esIdesGRUstA@b-5a5be265-807e-477b-86a7-f9445c19ead5.mq.us-east-2.amazonaws.com:5671',
    AMQP_TWITTER_EXCHANGE: process.env.AMQP_TWITTER_EXCHANGE || 'xinfin-twitter-trending-topic-exchange',
    AMQP_TWITTER_QUEUE: process.env.AMQP_TWITTER_QUEUE || 'xinfin-twitter-trending-topic-queue',
    AMQP_TWITTER_OPERATION: process.env.AMQP_TWITTER_OPERATION || 'xinfin_extractor_data_ops',
    TWITTER_API_URL: process.env.TWITTER_API_URL || 'https://api.twitter.com/1.1/trends/place.json',
    TWITTER_TOKEN: process.env.TWITTER_TOKEN || 'AAAAAAAAAAAAAAAAAAAAAJNjOwEAAAAAe89CnnNuKAGW4MMTuTc8uhUr7%2FA%3DoF2rYEEaorBBqfuT4YGkUcEmHncalGYivlkRJHNbjQUpcNtWAA',
    TWITTER_KEYWORDS: process.env.TWITTER_KEYWORDS || "",
    TWEET_COUNT: process.env.TWEET_COUNT || "",
    CRON_TIME: process.env.CRON_TIME || 30000
};
