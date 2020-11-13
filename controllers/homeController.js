const Vacante = require('../models/Vacantes');

exports.monstrarTrabajos = async (req, res, next) => {
  const vacantes = await Vacante.find().lean();

  if (!vacantes) return next();

  res.render('home', {
    nombrePagina: 'devJobs',
    tagline: 'Encuentra y Pública Trabajos para Desarrolados web',
    barra: true,
    boton: true,
    vacantes,
  });
};
