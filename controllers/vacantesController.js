// const mongoose = require('mongoose');
// const Vacante = mongoose.model('Vacante');
const Vacante = require('../models/Vacantes');

exports.formNuevaVacante = (req, res) => {
  res.render('nueva-vacante', {
    nombrePagina: 'Nueva Vacante',
    tagline: 'LLena el formulario y publica tu vacante',
  });
};

exports.agregarVacante = async (req, res) => {
  const vacante = new Vacante(req.body);

  // crear arreglo de habilidades
  vacante.skills = req.body.skills.split(',');

  // alamacenar en la bd
  const nuevaVacante = await vacante.save();

  // redirecccionar
  res.redirect(`/vacantes/${nuevaVacante.url}`);
};

exports.monstrarVacante = async (req, res, next) => {
  const vacante = await Vacante.findOne({ url: req.params.url }).lean();

  if (!vacante) return next();

  res.render('vacante', {
    vacante,
    nombrePagina: vacante.titulo,
    barra: true,
  });
};
