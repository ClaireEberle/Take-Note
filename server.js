const express = require('express');
const Notes = require ('./db/db.json');
const path = require('path');
const uuid = require('./helpers/uuid');
const fs = require('fs')

const PORT = process.env.PORT || 3001;

const app = express();
const router = require("express").Router(); 
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

// const {title, noteText } = req.body;
// if(title && noteText ) {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid(),
    };
    console.log(newNote)
    Notes.push(newNote)
    fs.writeFileSync("./db/db.json", JSON.stringify(Notes))
    res.json(Notes)
    const response = {
        status: 'success!',
        body: newNote,
    }
    console.log(response);
res.status(201).json(response);

})



app.delete('api/notes/:id', (req,res) => {
    for (let i=0; i<Notes.length; i++){
        removeArrayItem(Notes[i].id, req.params.id)
    }
    fs.writeFileSync("./db/db.json", JSON.stringify(Notes))
    res.json(Notes)
    
})



app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
})