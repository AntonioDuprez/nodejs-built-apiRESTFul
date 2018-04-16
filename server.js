'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
let contacts = require('./data');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/contacts', (req, res) => {
    if(!contacts){
        res.status(404).json({message: 'No contacts found'});
    }
    res.json(contacts);
});

app.get('/api/contacts/:id', (req, res) => {
    const reqId = req.params.id;

    let contact = contacts.filter(contact => {
        return contact.id == reqId;
    });

    if(contact == ""){
        res.status(404).json({ message: 'No contact found' });
    }
    res.json(contact);
});

// GET, POST, PUT, DELETE, PATCH

const hostname = 'localhost';
const port = 3001;


app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
});