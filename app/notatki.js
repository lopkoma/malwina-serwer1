const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    id_M: String,
    title: String,
    content: String

}, {
    timestamps: false
});

module.exports = mongoose.model('Note', NoteSchema);
