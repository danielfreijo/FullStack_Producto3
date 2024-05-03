const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
    project_id: {
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