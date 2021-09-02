import APP from 'express'
import DBConnection from './config/dbConnection'
import Utils from './app/utils'
import Config from './config'
import routes from './routes'
import {httpConstants} from './app/common/constants'

import AMQP from "./library";
import GetTrendingHashtagController from "./app/modules/trendingHashtag";

const app = new APP();
require('./config/express')(app);

global.lhtWebLog = Utils.lhtLog;
process.on('unhandledRejection', error => {
    // Will print "unhandledRejection err is not defined"
    console.log('unhandledRejection', error.message);
});

class Server {
    static listen() {

        Promise.all([ DBConnection.connect(),AMQP.conn(Config.AMQP_HOST_URL, true)]).then(() => {
            let server = app.listen(Config.PORT);
           
            Utils.lhtLog('listening', `Server Started on port ${Config.PORT}`, {}, 'AyushK', httpConstants.LOG_LEVEL_TYPE.INFO)
            routes(app);
            require('./config/jobInitializer')
           
            new GetTrendingHashtagController().getTrendingHashtags({});
        }).catch(error => Utils.lhtLog('listen', 'failed to connect', {err: error}, 'AyushK', httpConstants.LOG_LEVEL_TYPE.ERROR))
    }
}

Server.listen();
