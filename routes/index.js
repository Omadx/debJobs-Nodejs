const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const vacantesController = require('../controllers/vacantesController');
const usuariosController = require('../controllers/usuariosController');

module.exports = () => {
  router.get('/', homeController.monstrarTrabajos);

  // Crear Vacantes
  router.get('/vacantes/nueva', vacantesController.formNuevaVacante);
  router.post('/vacantes/nueva', vacantesController.agregarVacante);

  // Mostart Vacantes
  router.get('/vacantes/:url', vacantesController.monstrarVacante);

  // Editar Vacantes
  router.get('/vacantes/editar/:url', vacantesController.formEditarVacantes);
  router.post('/vacantes/editar/:url', vacantesController.editarVacantes);

  // Crear cuenta
  router.get('/crear-cuenta', usuariosController.formCrearCuenta);
  router.post(
    '/crear-cuenta',
    usuariosController.validarRegistro,
    usuariosController.crearUsuario
  );

  return router;
};
