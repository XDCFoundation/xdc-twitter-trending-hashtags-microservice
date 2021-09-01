
const mongoose = require("mongoose");

const twitterTrendingModel = new mongoose.Schema({
  trendingList: [
    {
      name: { type: String, default: "" },
      tweet_volume: { type: Number, default: "" },
      url: { type: String, default: "" },
      query:{ type:String, default:""},
      countryName:{type:String, default:""},
      latitude:{type:String, default:""},
      longitude:{type:String, default:""}
    },
  ],
  addedOn: { type: Number, default: Date.now() },
  modifiedOn: { type: Number, default: Date.now() },
  query:{ type:String, default:""}
});

twitterTrendingModel.method({
    saveData: async function () {
        return this.save();
    },
});

twitterTrendingModel.static({
    findData: function (findObj,selectionKey,skip=0,limit=0,sort='1') {
        return this.find(findObj,selectionKey).skip(skip).limit(limit).sort(sort);
    },
    findOneData: function (findObj) {
        return this.findOne(findObj);
    },
    findOneAndUpdateData: function (findObj, updateObj) {
        return this.findOneAndUpdate(findObj, updateObj, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
        });
    },
     insertManyDocument:function(obj){

        console.log("object in model",obj)
        return this.insertMany(obj)
    }
});

module.exports = mongoose.model("xf-trending-hashtags", twitterTrendingModel);
