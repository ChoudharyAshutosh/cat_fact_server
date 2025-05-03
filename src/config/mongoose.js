const mongoose = require('mongoose');
const { model } = require('mongoose');
const {v4: uuid} = require('uuid');
const constants = require('./constants');
const url = `mongodb://${constants.SERVER_ADDRESS}/'${constants.DB_NAME}`;

const noteSchema = mongoose.Schema({
    id: { type: String, default: uuid(), required: true, index: true},
    title: { type: String, required: true, maxLength: 15},
    content: { type: String, required: true, minLength: 20},
    catfact: {type: String, required: true}
});

noteSchema.index({ title: 'text', content: 'text', catfact: 'text' });

const Note = model('Notes', noteSchema);

module.exports.connectDB = async()=>{
    await mongoose.connect(url, {maxPoolSize:10});
}

module.exports.Note = Note;