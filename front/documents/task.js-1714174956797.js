const { Schema, model } = require('mongoose');

const taskSchema = Schema({
    /*_id: Schema.Types.ObjectId, esto es agregado automaticamente por Mongoose*/
    project_id: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    responsible: [String], 
    enddate: {
        type: Date,
        required: true,
    },
    notes: String,
    status: {
        type: String,
        enum: ['POR HACER', 'EN PROGRESO', 'FINALIZADO'], 
        required: true,   
    },
});

module.exports = model('Task', taskSchema);