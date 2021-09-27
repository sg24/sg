let objectID = require('mongoose').mongo.ObjectId;

const checkPageID = (condition={}, pageID) => {
    let updateCondition = pageID ? {...condition, _id: {$gt: objectID(pageID)}} : condition;
    return updateCondition;
} 

module.exports = checkPageID