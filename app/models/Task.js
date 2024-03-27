const { Schema, model } = require("mongoose");

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
    startdate: {
        type: String,
        required: false
    },
    enddate: {
        type: String,
        required: false
    },
    backgroundcolor: {
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
subjectSchema.methods.getproject_id = function() { return this.project_id; };
subjectSchema.methods.getuserassigned = function() { return this.userassigned; };
subjectSchema.methods.getnametask = function() { return this.nametask; };
subjectSchema.methods.getdescriptiontask = function() { return this.descriptiontask; };
subjectSchema.methods.getstartdate = function() { return this.startdate; };
subjectSchema.methods.getenddate = function() { return this.enddate; };
subjectSchema.methods.getbackgroundcolor = function() { return this.backgroundcolor; };
subjectSchema.methods.getstatus = function() { return this.status; };
// Setters
subjectSchema.methods.setId = function(n) { this.id=n;};
subjectSchema.methods.setproject_id = function(n) { this.project_id=n;};
subjectSchema.methods.setuserassigned = function(n) { this.userassigned=n;};
subjectSchema.methods.setnametask = function(n) { this.nametask=n;};
subjectSchema.methods.setdescriptiontask = function(n) { this.descriptiontask=n;};
subjectSchema.methods.setstartdate = function(n) { this.startdate=n;};
subjectSchema.methods.setenddate = function(n) { this.enddate=n;};
subjectSchema.methods.setbackgroundcolor = function(n) { this.backgroundcolor=n;};
subjectSchema.methods.setstatus = function(n) { this.status=n;};

// Listas
subjectSchema.methods.addTasks = function (h){this.tasks.push(h)};
subjectSchema.methods.getTasks = function () {return this.tasks}

module.exports = mongoose.model('Subject', subjectSchema);

