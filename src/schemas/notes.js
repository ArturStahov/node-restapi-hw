const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    note: {
        type: String,
        required: [true, 'notes is required']
    },
    isImportant: {
        type: Boolean,
        required: [true, 'isImportant is required']
    },
    owner: {
        name: String,
    }

},
    {
        versionKey: false,
        timestamps: true
    }
);

const Notes = mongoose.model('notes', notesSchema)

module.exports = Notes