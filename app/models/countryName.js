
const mongoose = require("mongoose");

const countryDetails = new mongoose.Schema({
    
        Id: { type: String, default:"" },
        countryName: { type: String, default: "" },
        latitude:{type: String, default: "" },
        longitude:{type: String, default: "" },
        
   
   
    isDeleted: { type: Boolean, default: false },
    addedOn: { type: Number, default: Date.now() },
    modifiedOn: { type: Number, default: Date.now() }
});

countryDetails.method({
    saveData: async function () {
        return this.save();
    },
});
countryDetails.static({
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
    findDataWithAggregate: function (findObj) {
        console.log("object in findDataWithAggregate",findObj)
        return this.aggregate(findObj);
    },
    insertManyDocument:function(obj){

        console.log("object in model",obj)
        return this.insertMany(obj)
    }
});

module.exports = mongoose.models['xf-countrydetails'] || mongoose.model('xf-countrydetails', countryDetails);
