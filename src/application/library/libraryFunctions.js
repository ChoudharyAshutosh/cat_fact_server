var model = require('../model/model');
var constants = require('../../config/constants');
var os = require('os');

module.exports.getLocalIPv4 = ()=>{
    const interfaces = os.networkInterfaces();
  
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
  
    return '127.0.0.1';
  }

module.exports.retrieveNotes = async()=>{
    let result = await model.retrieveNotes();

    if(!result){
        return {
            status: false,
            code: 301,
            msg: 'Some error occurred.'
        };
    }

    return {
        status: true,
        code: 200,
        data: result.reverse(),
        msg: 'Data fetched successfully'
    };
}

module.exports.createNote = async(data)=>{
    if(!data.title || !data.content){
        return {
            status: false,
            code: 301,
            msg: 'Please provide valid data.'
        };
    }

    if(data.title.length > 15){
        return {
            status: false,
            code: 301,
            msg: 'Title should be less than 15 characters.'
        };
    }

    if(data.content.length <= 20){
        return {
            status: false,
            code: 301,
            msg: 'Content should not be less than 20 characters.'
        };
    }

    let response = await fetch(constants.CAT_FACT_ADDRESS);
    response = await response.json();

    data.catfact = response.fact;

    let result = await model.createNote(data);

    if(!result){
        return {
            status: false,
            code: 301,
            msg: 'Some error occurred.'
        };
    }

    return {
        status: true,
        code: 200,
        msg: 'Note created successfully'
    };
}

module.exports.removeNote = async(data)=>{
    if(!data.id){
        return {
            status: false,
            code: 301,
            msg: 'Please provide valid data.'
        };
    }

    let result = await model.removeNote(data);

    if(!result){
        return {
            status: false,
            code: 301,
            msg: 'Some error occurred.'
        };
    }

    return {
        status: true,
        code: 200,
        msg: 'Note removed successfully'
    };
}

module.exports.searchNote = async(data)=>{
    if(!data.string){
        return {
            status: false,
            code: 301,
            msg: 'Please provide valid data.'
        };
    }

    let result = await model.searchNote(data);

    if(!result){
        return {
            status: false,
            code: 301,
            msg: 'Some error occurred.'
        };
    }

    return {
        status: true,
        code: 200,
        data: result,
        msg: 'Data fetched successfully'
    };
}