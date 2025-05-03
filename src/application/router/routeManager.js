var express = require('express');
var router = express.Router();

var controller = require('../controller/controller');
router.get('/retrieveNotes', controller.retrieveNotes);
router.post('/createNote', controller.createNote);
router.delete('/removeNote', controller.removeNote);
router.all('/searchNote', controller.searchNote);

module.exports = (app)=>{
    app.use('/api',router);
};