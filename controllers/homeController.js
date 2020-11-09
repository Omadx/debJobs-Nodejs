exports.monstrarTrabajos = (req, res) => {
  res.render('home', {
    nombrePagina: 'debJobs',
    tagline: 'Encuentra y Pública Trabajos para Desarrolados web',
    barra: true,
    boton: true,
  });
};
