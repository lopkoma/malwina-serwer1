module.exports = (app) => {
    const notes = require('./controller.js');

    app.post('/notatki', notes.create);

    app.get('/notatki', notes.findAll);

    app.put('/notatki/:noteId', notes.update);

    app.delete('/notatki/:noteId', notes.delete);
}
