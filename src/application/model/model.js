var { Note } = require('../../config/mongoose');
const {v4: uuid} = require('uuid');

module.exports.retrieveNotes = async()=>{
    try{
        let res = await Note.find();
        return res;
    }
    catch(err){
        console.log(err);
        return false;
    }
};

module.exports.createNote = async(data)=>{
    try{
        const note = new Note({
            id: uuid(),
            title: data.title,
            content: data.content,
            catfact: data.catfact
        });
    
        let res = await note.save();
        return true;
    }
    catch(err){
        console.log(err);
        return false;
    }
};

module.exports.removeNote = async(data)=>{
    try{
        let options = {
            id: data.id
        }
        let res = await Note.findOneAndDelete(options);
        return true;
    }
    catch(err){
        console.log(err);
        return false;
    }
};

module.exports.searchNote = async(data)=>{
    try{
        let option = {
            content : {
                $regex : `${data.string}`,
                $options: 'i'
            }
        }
        let res = await Note.find(option);
        return res;
    }
    catch(err){
        console.log(err);
        return false;
    }
};