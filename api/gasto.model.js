const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Gasto = new Schema({
  valor: {
    type: Number
  },
  tipo: {
    type: String
  },
  data: {
    type: String
  }
}, {
  collection: 'gasto'
});

module.exports = mongoose.model('Gasto', Gasto)
