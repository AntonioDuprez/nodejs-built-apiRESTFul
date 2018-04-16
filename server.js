'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
let contacts = require('./data');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Muestra todos los contactos existentes en nuestro archivo json
app.get('/api/contacts', (req, res) => {
    if(!contacts){
        res.status(404).json({message: 'No contacts found'});
    }
    res.json(contacts);
});

// Filtra los contactos mediante el id introducido por GET
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

// Añade un contacto según los parámetros enviados por POST al final de nuestro json 
// (no se guarda actualmente, solo se almacena hasta que se cierra el servidor, petición o navegador)
app.post('/api/contacts', (req, res) => {
    const contact = {
        id: contacts.length + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        website: req.body.website
    }

    contacts.push(contact);

    res.json(contact);
});

// Permite modificar los datos de un contacto filtrado por el id
// Primero filtra por el id y después sería como un post ?req.datos
app.put('/api/contacts/:id', (req, res) =>{
    const reqId = req.params.id;

    let contact = contacts.filter(contact => {
        return contact.id == reqId;
    })[0];

    const index = contacts.indexOf(contact);
    const keys = Object.keys(req.body);

    keys.forEach(key => {
        contact[key] = req.body[key];
    });

    contacts[index] = contact;

    res.json(contacts[index]);
});

// Elimina un contacto específico filtrado por Id.
app.delete('/api/contacts/:id', (req, res) => {
    const reqId = req.params.id;

    let contact = contacts.filter(contact => {
        return contact.id = reqId;
    })[0];

    const index = contacts.indexOf(contact);

    // Elimina los elementos existentes pudiendo agregar, nuevos:
    // Parametro 1: la posición a eliminar
    // Parametro 2: cuantas posiciones a partir de esa quieres eliminar
    // Parametro 3: (opcional) Porque quieres sustituir esas posiciones
    contacts.splice(index, 1); // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/splice

    res.json({ message: `User ${reqId} delete.`});
});
// GET, POST, PUT, DELETE, PATCH

const hostname = 'localhost';
const port = 3001;


app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
});