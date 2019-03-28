'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FinderSchema = new Schema({
    keyword:{
        type: String,
        required:'Keyword is required'
    },
    
    dateInit:{
        type: Date,
        required: true
    },
    dateEnd:{
        type: Date,
        required: true
    },
    priceMin:{
        type: Number,
        required: 'princeMin is required',
        min: 0
    },
    priceMax:{
        type: Number,
        required: 'priceMax is required'
    },
    explorerID:{
        type: Schema.Types.ObjectId,
        ref: "Actor",
        required: 'explorer actor id required'
    }

  }, { strict: false });
