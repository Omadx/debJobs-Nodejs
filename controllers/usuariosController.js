const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');
const { body, validationResult } = require('express-validator');

exports.formCrearCuenta = (req, res) => {
  res.render('crear-cuenta', {
    nombrePagina: 'Crea tu cuenta en DevJobs',
    tagline: 'Comienza a crear una cuenta gratis...',
  });
};

exports.validarRegistro = async (req, res, next) => {
  const rules = [
    body('nombre')
      .not()
      .isEmpty()
      .withMessage('El nombre es obligatorio')
      .escape(),
    body('email')
      .isEmail()
      .withMessage('El email es obligatorio')
      .normalizeEmail(),
    body('password')
      .not()
      .isEmpty()
      .withMessage('El password es obligatorio')
      .escape(),
    body('confirmar')
      .not()
      .isEmpty()
      .withMessage('Confirmar password es obligatorio')
      .escape(),
    body('confirmar')
      .equals(req.body.password)
      .withMessage('Los passwords no son iguales'),
  ];
  await Promise.all(rules.map((validation) => validation.run(req)));
  const errores = validationResult(req);
  //si hay errores
  if (!errores.isEmpty()) {
    req.flash(
      'error',
      errores.array().map((error) => error.msg)
    );
    res.render('crear-cuenta', {
      nombrePagina: 'Crea tu cuenta en Devjobs',
      tagline:
        'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta',
      mensajes: req.flash(),
    });
    console.log(errores);
    return;
  }
  //si toda la validacion es correcta
  next();
};

exports.crearUsuario = async (req, res, next) => {
  // Crear el usuario
  const usuario = new Usuarios(req.body);

  //console.log(usuario);
  //const nuevoUsuario = await usuario.save();

  //if (!nuevoUsuario) return next();
  try {
    await usuario.save();
    res.redirect('/iniciar-sesion');
  } catch (error) {
    req.flash('error', error);
    res.redirect('/crear-cuenta');
  }
  //res.redirect('/iniciar-sesion');
};
