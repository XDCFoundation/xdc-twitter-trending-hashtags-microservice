/**
 * Created by Developer on 13/05/21.
 */

 const BlManager = require("./manager");
 class Manger {
     async getTrendingHashtags() {
         return await new BlManager().getTrendingHashtags();
     }
 }
 module.exports = Manger;
 