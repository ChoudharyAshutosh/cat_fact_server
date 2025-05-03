var functions = require('../library/libraryFunctions');

module.exports.retrieveNotes = async(req, res)=>{
    let response = await functions.retrieveNotes();
    res.json(response);
}

module.exports.createNote = async(req, res)=>{
    var data = req.body;
    let response = await functions.createNote(data);
    res.json(response);
}

module.exports.removeNote = async(req, res)=>{
    var data = req.body;
    let response = await functions.removeNote(data);
    res.json(response);
}

module.exports.searchNote = async(req, res)=>{
    var data = req.body;
    let response = await functions.searchNote(data);
    res.json(response);
}