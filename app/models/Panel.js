const { Schema, model } = require("mongoose");

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
    dataAccess: {
        type: String,
        required: false
    },
    priority: {
        type: String,
        required: false
    },
    status: {
        type: String,
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
subjectSchema.methods.setDataAccess = function(n) { this.dataAccess=n;};
subjectSchema.methods.setPriority = function(n) { this.priority=n;};
subjectSchema.methods.setStatus = function(n) { this.status=n;};

// Listas
subjectSchema.methods.addProjects = function (h){this.projects.push(h)};
subjectSchema.methods.getProjects = function () {return this.projects}

module.exports = mongoose.model('Subject', subjectSchema);


