const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title:{type: String, required: true, unique:true},
    content: {type: String, required: true},
    date: { type: Date, default: Date.now},
    complete: { type: Boolean, default: false}
})

module.exports = model('Notes', schema)