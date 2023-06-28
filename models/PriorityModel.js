const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PrioritySchema = new Schema({
    name: {
      type: String,
      required: true,
    },
  });
  
  module.exports = mongoose.model('Priority', PrioritySchema);
  