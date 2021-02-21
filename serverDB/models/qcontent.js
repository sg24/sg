const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const QcontentSchema = new Schema({
    question: [{
        content: {
            type: String,
            required: true,
            trim: true
        },
        answer: {
            type: String,
            trim: true
        },
        examType: {
            type: String,
            required: true,
            trim: true
        },
        media: [{
            id: ObjectId, 
            filename: String, 
            bucket: String,
            ext: String, 
            description: String
        }],
        hashTag: {
            type: Array,
            default: [String]
        },
        answerOption: {
            type: Object
        }
    }],
    tempFileID: String
})

const qcontent = mongoose.model('qcontents', QcontentSchema);
module.exports = qcontent;
