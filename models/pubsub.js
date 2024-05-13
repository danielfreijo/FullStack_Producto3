const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
    /*_id: Schema.Types.ObjectId, esto es agregado automaticamente por Mongoose*/
    task_id: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}); 

module.exports = model('TaskSuscription', projectSchema);