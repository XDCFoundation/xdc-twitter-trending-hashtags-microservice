
import Config from "../../../config";
import { httpConstants,amqpConstants } from "../../common/constants";
const countryDetails = require('../../models/countryName');
const fetch = require('node-fetch');
import Utils from "../../utils";
import RabbitMqController from "../queue/index";
const TwitterTrendingModel = require("../../models/twitterTrendingModel")



class BLManager {

    async getTrendingHashtagsFromDB(req) {
        // Utils.lhtLog('BLManager:getTrendingHashtagsFromDB', ' getting trending hashTags from DB', '', 'INFO');

        let selectionKey={
            trendingList:1.0 ,
        }
        let skip = parseInt(req.skip);
        let limit = parseInt(req.limit);
        let response=[];
        let result= await TwitterTrendingModel.findData({},selectionKey,skip?skip:0,limit?limit:1,{addedOn: -1})
        for(let index=0; index<result[0].trendingList.length; index++){
            let newObj={}
            // newObj._id=result[0][index]._id
            newObj.name=result[0].trendingList[index].name
            newObj.countryName=result[0].trendingList[index].countryName
            newObj.latitude=result[0].trendingList[index].latitude
            newObj.longitude=result[0].trendingList[index].longitude
            newObj.tweet_volume=result[0].trendingList[index].tweet_volume

            response.push(newObj)

        }
        return response
    }

    async getTrendingHashtags() {
        Utils.lhtLog('BLManager:getTrendingHashtags', ' Started Trending hashTags ', '', 'INFO');
        
        setInterval(async () => {
        let result = await countryDetails.findData({}, {}, 0, 0, {addedOn: -1})
        // let tweetCount = await countryDetails.find().count()


        const getData = async () => {
             let tweetDetails = await Promise.all(result.map((e) => getDataFromUrl(e.Id,e.countryName,e.latitude,e.longitude)))
        Utils.lhtLog('BLManager:getTrendingHashtags', ' tweetDetails.flat()', tweetDetails.flat(), 'INFO');

            return tweetDetails.flat()
        }

        const getDataFromUrl = async (id,countryname,latitude,longitude) => {
            const _url = `${Config.TWITTER_API_URL}?id=${id}`
        Utils.lhtLog('BLManager:getTrendingHashtags',  _url , 'URL', 'INFO');

            return  fetch(_url, {
                headers: {
                    'User-Agent': 'v2RecentSearchJS',
                    authorization: `Bearer ${Config.TWITTER_TOKEN}`,
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if(!responseJson || responseJson.length<=0 || !responseJson[0].trends){
                        return 
                    }
                   let tweetData = responseJson[0].trends.slice(0, 1)
                   tweetData[0].countryName=countryname
                   tweetData[0].latitude=latitude
                   tweetData[0].longitude=longitude
           Utils.lhtLog('BLManager:getTrendingHashtags',  tweetData , 'tweetData', 'INFO1');

                   return tweetData
                })
                .catch((error) => {
                    console.error(error)
                })
        }

        let tweetArray = await getData();

        Utils.lhtLog('BLManager:getTrendingHashtags', ' responseData ', tweetArray, 'INFO');

        let twitterTrendingModel = new TwitterTrendingModel();
        //console.log(requestData,"requestDATA=========")
        twitterTrendingModel.trendingList = tweetArray
        twitterTrendingModel.query = getQueryString(tweetArray)
        twitterTrendingModel.addedOn = new Date().getTime();
        twitterTrendingModel.modifiedOn = new Date().getTime();

        function getQueryString(requestData) {
            if (!requestData || requestData.length < 1)
                return ''
            let queryString = ''
            requestData.map((obj) => {
                if (queryString.length > 0)
                    queryString = `${queryString} ${obj.query}`;
                else
                    queryString = `${obj.query}`;
            })
            return queryString
        }

        try {
            twitterTrendingModel.saveData();
            Utils.lhtLog('sendTweetToBlockChain', `Completed transaction speed and saved to db`, {}, '', httpConstants.LOG_LEVEL_TYPE.INFO);
        } catch (err) {
            Utils.lhtLog('sendTweetToBlockChain', `Error occured while saving to db`, {}, '', httpConstants.LOG_LEVEL_TYPE.INFO);
            return err;
        }

        // try {
        //     let dbresponse = await new TwitterStateManager().pushTrendingHasTags(tweetArray);
        //     Utils.lhtLog('BLManager:getTrendingHashtags', ' DBresponse ', dbresponse, 'INFO');
        // } catch (error) {
        //     console.log(error)
        // }

        let newArray = JSON.stringify(tweetArray);
        let queueData = JSON.stringify({
            type: Config.AMQP_TWITTER_OPERATION,
            payload: newArray,
        });


        Utils.lhtLog('BLManager:getTrendingHashtags', ' queueData ', queueData, 'INFO');
        try {
            let rabbitMqController = new RabbitMqController();
            let amqpResponse = await rabbitMqController.insertInQueue(Config.AMQP_TWITTER_EXCHANGE, Config.AMQP_TWITTER_QUEUE, "", "", "", "", "", amqpConstants.exchangeType.FANOUT, amqpConstants.queueType.PUBLISHER_SUBSCRIBER_QUEUE, queueData);
            Utils.lhtLog('BLManager:getTrendingHashtags', ' queueResponse ', amqpResponse, 'INFO');

            return true;
        } catch (error) {
            console.log(error)
        }
    }, Config.CRON_TIME)

    };

}

module.exports = BLManager
