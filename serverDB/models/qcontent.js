const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const QcontentSchema = new Schema({
    id: ObjectId,
    qchatID: {
        type: String,
        required: true
    },
    question: [{
        position: {
            type: Number
        },
        question: {
            type: String
        },
        option: {
            type: String
        },
        answer: {
            type: String
        },
        image: {
            type: Array,
            default: []
        },
        video: {
            type: Array,
            default: []
        },
        snapshot: {
            type: Array,
            default: []
        }
    }]
})
QcontentSchema.index({title: 'text'});
const qcontent = mongoose.model('qcontents', QcontentSchema);

module.exports = qcontent;
