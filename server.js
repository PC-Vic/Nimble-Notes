const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded ({extended:true}));
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf-8').then(data => {
        res.json(JSON.parse(data))
        
    })
})

//another route for saving POST app.post()
// read it, convert it to JSON, add the new data to the json, rewrite the entire data to the file
app.post('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf-8').then(data => {
        const notes = JSON.parse(data);
        const newNote = req.body;
        notes.push(newNote)
    fs.writeFile('db/db.json', JSON.stringify(notes) ).then(() => {
        console.log("added notes");
    })
    })

})




app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

