const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  // Define your item schema fields and validation rules
  // id:{
  //   type : Number,
  //   required: true
  // },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
