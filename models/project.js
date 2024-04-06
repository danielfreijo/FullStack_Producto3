const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
    /*_id: Schema.Types.ObjectId, esto es agregado automaticamente por Mongoose*/
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        enum: ['Desarrollo', 'Diseño', 'Marketing'], 
        default: 'Desarrollo',
    },
    backgroundcolor: {
        type: String,
        default: '#ffffff',
    },
    backgroundimage: {
        type: String,
        default: null,
    },
    backgroundcolorcard: {
        type: String,
        default: '#000000',
    },
    backgroundcard: {
        type: String,
        default: null,
    },  
    priority: {
        type: Boolean,
        default: false, 
    },
    dateAccess: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model('Project', projectSchema);
    