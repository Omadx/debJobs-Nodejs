const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const vacantesController = require('../controllers/vacantesController');

module.exports = () => {
  router.get('/', homeController.monstrarTrabajos);

  // Crear Vacantes
  router.get('/vacantes/nueva', vacantesController.formNuevaVacante);
  router.post('/vacantes/nueva', vacantesController.agregarVacante);

  // Mostart Vacantes
  router.get('/vacantes/:url', vacantesController.monstrarVacante);

  // Editar Vacantes
  router.get('/vacantes/editar/:url', vacantesController.formEditarVacantes);

  return router;
};
