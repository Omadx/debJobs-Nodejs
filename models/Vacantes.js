const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slug');
const shortId = require('shortId');

const vacantesSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: 'El nombre de la vacante es obligatorio',
    trim: true,
  },
  empresa: {
    type: String,
    trim: true,
  },
  ubicacion: {
    type: String,
    trim: true,
    required: 'La ubicacion es obligatoria',
  },
  salario: {
    type: String,
    default: 0,
  },
  contrato: {
    type: String,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    lowercase: true,
  },
  skills: [String],
  candidatos: [
    {
      nombre: String,
      email: String,
      cv: String,
    },
  ],
});

vacantesSchema.pre('save', function (next) {
  // crear url
  const url = slug(this.titulo);
  this.url = `${url}-${shortId.generate()}`;

  next();
});

module.exports = mongoose.model('Vacante', vacantesSchema);
