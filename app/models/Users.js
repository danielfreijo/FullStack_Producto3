const mongoose = require('mongoose');
const { Schema } = mongoose;

const subjectSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    pass: {
        type: String, 
        required: true
    },
    active: {
        type: String, 
        required: integer
    },
    Perfil: {
        type: String,
        required: true
    },
    Responsabilidades: {
        type: String,
        required: false
    },
    Desafios: {
        type: String,
        required: false
    }

});

// Getters
subjectSchema.methods.getnombre = function() { return this.nombre; };
subjectSchema.methods.getpass = function() { return this.pass; };
subjectSchema.methods.getactive = function() { return this.active; };
subjectSchema.methods.getPerfil = function() { return this.Perfil; };
subjectSchema.methods.getResponsabilidades = function() { return this.Responsabilidades; };
subjectSchema.methods.getDesafios = function() { return this.Desafios; };

// Setters
subjectSchema.methods.setnombre = function(n) { this.nombre=n;};
subjectSchema.methods.setpass = function(n) { this.pass=n;};
subjectSchema.methods.setactive = function(n) { this.active=n;};
subjectSchema.methods.setPerfil = function(n) { this.Perfil=n;};
subjectSchema.methods.setResponsabilidades = function(n) { this.Responsabilidades=n;};
subjectSchema.methods.setDesafios = function(n) { this.Desafios=n;};

// Listas
subjectSchema.methods.addUser = function (h){this.users.push(h)};
subjectSchema.methods.getUser = function () {return this.users}

module.exports = mongoose.model('Subject', subjectSchema);
module.exports = Subject;