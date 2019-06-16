const Notatka = require('./notatki');

// nowa notatka
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Nota nie moze byc pusta"
        });
    }
    const note = new Notatka({
        title: req.body.title || "Brak tytulu",
        content: req.body.content
    });

    note.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Nie okreslony blad ."
        });
    });
};

exports.findAll = (req, res) => {
    Notatka.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
        res.status(500).send({
            message: err.message ||"Nie okreslony blad "
        });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Brak ciala notatki "
        });
    }

    // Find note and update it with the request body
    Notatka.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "brak tytulu notatki",
        content: req.body.content
    }, {new: true})
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Notatka nie znaleziona"
                });
            }
            res.send(note);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Notatka nie znaleziona 404"
            });
        }
        return res.status(500).send({
            message: "Blad serwera "
        });
    });
};

exports.delete = (req, res) => {
    Notatka.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Nie znalezniono " + req.params.noteId
                });
            }
            res.send({message: "Notatka wywalona!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "404 blad nie odnaleziono obiektu"
            });
        }
        return res.status(500).send({
            message: "Blad serwera "
        });
    });
};
