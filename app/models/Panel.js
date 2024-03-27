const mongoose = require('mongoose');
const { Schema } = mongoose;

const subjectSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    descripcion: {
        type: String, 
        required: true
    },
    department: {
        type: String,
        required: true
    },
    backgroundcolor: {
        type: String,
        required: false
    },
    backgroundimage: {
        type: String,
        required: false
    },
    backgroundcolorcard: {
        type: String,
        required: false
    },
    backgroundcard: {
        type: String,
        required: false
    },
    dataAccess: {
        type: Date,
        required: false
    },
    priority: {
        type: integer,
        required: false
    },
    status: {
        type: integer,
        required: false
    }
});

// Getters
subjectSchema.methods.getId = function() { return this.id; };
subjectSchema.methods.getName = function() { return this.name; };
subjectSchema.methods.getDescription = function() {return this.descripcion;}
subjectSchema.methods.getDepartment = function() {return this.department;}
subjectSchema.methods.getBackgroundcolor = function() {return this.backgroundcolor;}
subjectSchema.methods.getBackgroundimage = function() {return this.backgroundimage;}
subjectSchema.methods.getBackgroundcolorcard = function() {return this.backgroundcolorcard;}
subjectSchema.methods.getBackgroundcard = function() {return this.backgroundcard;}
subjectSchema.methods.getDataAccess = function() {return this.dataAccess;}
subjectSchema.methods.getPriority = function() {return this.priority;}
subjectSchema.methods.getStatus = function() {return this.status;}

// Setters
subjectSchema.methods.setId = function(n) { this.id=n;};
subjectSchema.methods.setName = function(n) { this.name=n;};
subjectSchema.methods.setDescription = function(n) { this.descripcion=n;};
subjectSchema.methods.setDepartment = function(n) { this.department=n;};
subjectSchema.methods.setBackgroundcolor = function(n) { this.backgroundcolor=n;};
subjectSchema.methods.setBackgroundimage = function(n) { this.backgroundimage=n;};
subjectSchema.methods.setBackgroundcolorcard = function(n) { this.backgroundcolorcard=n;};
subjectSchema.methods.setBackgroundcard = function(n) { this.backgroundcard=n;};
subjectSchema.methods.setDataAccess = function(n) { this.dataAccess=n;};
subjectSchema.methods.setPriority = function(n) { this.priority=n;};
subjectSchema.methods.setStatus = function(n) { this.status=n;};

// Listas
subjectSchema.methods.addProjects = function (h){this.projects.push(h)};
subjectSchema.methods.getProjects = function () {return this.projects}

module.exports = mongoose.model('Subject', subjectSchema);
module.exports = Subject;

