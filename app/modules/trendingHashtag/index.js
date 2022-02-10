/**
 * Created by Developer on 13/05/21.
 */

import BlManager  from "./manager";
import {apiSuccessMessage,httpConstants} from "../../common/constants";
import Utils from "../../utils"

 class TrendingController {
     async getTrendingHashtags() {
         return await new BlManager().getTrendingHashtags();
     }

     async getTrendingHashtagsFromDB(request,response) {
         Utils.lhtLog("TrendingController:getTrendingHashtagsFromDB", "", "", '', httpConstants.LOG_LEVEL_TYPE.INFO);
         let [error, latestAccountsResponse] = await Utils.parseResponse(new BlManager().getTrendingHashtagsFromDB(request.query));
         if (error) {
             Utils.lhtLog("TrendingController:getTrendingHashtagsFromDB", "getTrendingHashtagsFromDB err", error, "", "ERROR")
             return Utils.handleError([error], request, response);
         }
         return Utils.response(response, latestAccountsResponse, apiSuccessMessage.FETCH_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK);
     }
 }
 module.exports = TrendingController;
 