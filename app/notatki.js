const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    id: Number,
    title: String,
    content: String

}, {
    timestamps: false
});

module.exports = mongoose.model('Note', NoteSchema);
