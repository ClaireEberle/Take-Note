const express = require('express');
const Notes = require ('./db/db.json');
const path = require('path');
const uuid = require('./helpers/uuid');

const PORT = 3001;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req,res) => {
    res.json(Notes)
});

app.post('/api/notes', (req,res) => {
console.info(`${req.method} reqeust recieved to add a notes`);

const {title, noteText } = req.body;
if(title && noteText ) {
    const newNote = {
        title,
        newNote,
        note_id: uuid(),
    };
    const response = {
        status: 'success!',
        body: newNote,
    }
    console.log(response);
res.status(201).json(response);
} else {
    res.status(500).json('Error in posting new note')
}
})

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
})