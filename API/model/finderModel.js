'use strict';
var mongoose = require('mongoose'),
    trips = mongoose.model('Trips'),
    actor = mongoose.model('Actors');
var Schema = mongoose.Schema;

var FinderSchema = new Schema({
    result: [trips.schema],
    keyword: {
        type: String,
        required: 'Keyword is required'
    },
    dateInit: {
        type: Date,
        required: true
    },
    dateEnd: {
        type: Date,
        required: true
    },
    priceMin: {
        type: Number,
        required: 'princeMin is required',
        min: 0
    },
    priceMax: {
        type: Number,
        required: 'priceMax is required'
    },
    explorerID: {
        type: Schema.Types.ObjectId,
        ref: "Actor",
        required: 'explorer actor id required'
    }
}, { strict: false });

module.exports = mongoose.model('FinderSchema', FinderSchema);
