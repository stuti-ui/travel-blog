/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const { Schema } = mongoose;


const requiredString = {
    type: String,
    required: true,
},

const requiredNumber = {
    type: String,
    required: true,
},


const logEntrySchema = new Schema({
  title: requiredString, // String is shorthand for {type: String}
  description: String,
  comments: String,
  rating:{
    type: Number,
    min: [1, 'Very Bad'],
    max: 10,
    default: 0,
  } ,
  image: String,
  latitude : {
      ...requiredNumber,
      min: -90,
      max: 90,
  },
  longitude:{ 
    ...requiredNumber,
    min: -180,
    max: 180,
  },
  visitDate : {
      reuired: true,
      type: Date,
  }
},{
    timestamps: true,
});

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;