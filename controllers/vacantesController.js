exports.formNuevaVacante = (req, res) => {
  res.render('nueva-vacante', {
    nombrePagina: 'Nueva Vacante',
    tagline: 'LLena el formulario y publica tu vacante',
  });
};
