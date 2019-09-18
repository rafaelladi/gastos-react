const express = require('express');
const gastoRoutes = express.Router();

let Gasto = require('./gasto.model');

gastoRoutes.route('/add').post(function(req, res) {
  console.log(req.body);
  let gasto = new Gasto(req.body);
  gasto.save()
    .then(gasto => {
      res.status(200).json({'gasto': 'gasto added successfully'});
    })
    .catch(err => {
      res.status(400).send("Unable to save to database");
    });
});

gastoRoutes.route('/').get(function(req, res) {
  Gasto.find(function(err, gastos) {
    if(err) {
      console.log(err);
    } else {
      res.json(gastos);
    }
  });
});

gastoRoutes.route('/edit/:id').get(function(req, res) {
  let id = req.params.id;
  Gasto.findById(id, function(err, gasto) {
    res.json(gasto);
  });
});

gastoRoutes.route('/update/:id').post(function(req, res) {
  Gasto.findById(req.params.id, function(err, gasto) {
    if(!gasto)
      res.status(404).send("data is not found");
    else {
      gasto.valor = req.body.valor;
      gasto.tipo = req.body.tipo;
      gasto.data = req.body.data;

      gasto.save().then(gasto => {
        res.json('Update complete');
      })
      .catch(err => {
        res.status(400).send("Unable to update the database");
      });
    }
  });
});

gastoRoutes.route('/delete/:id').get(function(req, res) {
  Gasto.findByIdAndRemove({_id: req.params.id}, function(err, gasto) {
    if(err)
      res.json(err);
    else
      res.json('Successfully removed');
  });
});

module.exports = gastoRoutes;
