const mongoose = require('mongoose');
const { Schema } = mongoose;

const subjectSchema = new Schema({
    idtask: {
        type: integer,
        required: true
    },
    project_id: {
        type: integer, 
        required: true
    },
    userassigned: {
        type: String, 
        required: true
    },
    nametask: {
        type: String,
        required: true
    },
    descriptiontask: {
        type: String,
        required: false
    },
    notes: {
        type: String,
        required: false
    },
    startdate: {
        type: String,
        required: false
    },
    enddate: {
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
subjectSchema.methods.getProject_id = function() { return this.project_id; };
subjectSchema.methods.getUserassigned = function() { return this.userassigned; };
subjectSchema.methods.getNametask = function() { return this.nametask; };
subjectSchema.methods.getDescriptiontask = function() { return this.descriptiontask; };
subjectSchema.methods.getNotes = function() { return this.notes; };
subjectSchema.methods.getStartDate = function() { return this.startdate; };
subjectSchema.methods.getEndDate = function() { return this.enddate; };
subjectSchema.methods.getStatus = function() { return this.status; };
// Setters
subjectSchema.methods.setId = function(n) { this.id=n;};
subjectSchema.methods.setProject_id = function(n) { this.project_id=n;};
subjectSchema.methods.setUserassigned = function(n) { this.userassigned=n;};
subjectSchema.methods.setNametask = function(n) { this.nametask=n;};
subjectSchema.methods.setDescriptiontask = function(n) { this.descriptiontask=n;};
subjectSchema.methods.setNotes = function(n) { this.notes=n;};
subjectSchema.methods.setStartDate = function(n) { this.startdate=n;};
subjectSchema.methods.setEndDate = function(n) { this.enddate=n;};
subjectSchema.methods.setStatus = function(n) { this.status=n;};

// Listas
subjectSchema.methods.addTasks = function (h){this.tasks.push(h)};
subjectSchema.methods.getTasks = function () {return this.tasks}

module.exports = mongoose.model('Subject', subjectSchema);
module.exports = Subject;
