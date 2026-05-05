/* DB SCHEMA
*
* user {
*   id: guid,
*   name: text,
*   role: "admin"
* }
*
* Pets {
*   id: guid,
*   name: text,
*   type: text
*   owner: text
*   dob: timestamp
* }
*
* Records {
*   id: guid,
*   name: text,
*   type: ["vaccine", "allergy"]
*   date_given: timestamp
*   reactions: text
*   severity: ["mild", "severe"]
* }
*/

import express from 'express'
import db from './db.js'
import cors from 'cors'

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json())
app.use(cors());

app.listen(3001, () => console.log('Server running on port 3001'));

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/{*path}', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

// ================ PETS endpoint ================
app.get('/api/pets', (req, res) => {
    const pets = db.prepare('SELECT * FROM pets').all();

    res.json(pets);
});

app.get('/api/pets/:id', (req, res) => {
    const id = req.params.id;
    const pet = db.prepare('SELECT * FROM pets WHERE id = ?').get(id);

    if(!pet) return res.status(404).send('No pet found with id ' + id);

    res.status(200).json(pet)
})

app.post('/api/pets', (req, res) => {
    const { name, type, dob } = req.body

    if (!name || !type || !dob) return res.status(400).send('Missing pet info');

    // Default to the first user
    // Optimization, owner would be the user logged in that is creating the entry
    const allUsers = db.prepare('SELECT * FROM users').all()
    const currentUser = allUsers[0];

    const result = db.prepare('INSERT INTO pets (name, type, dob, owner_id) VALUES (?, ?, ?, ?)').run(name, type, dob, currentUser.id);
    const createdPet = db.prepare('SELECT * FROM pets WHERE id = ?').get(result.lastInsertRowid);

    res.status(200).json(createdPet);
});

app.put('/api/pets/:id', (req, res) => {
    const { id } = req.params;
    const { name, type, dob } = req.body

    const pet = db.prepare('SELECT * FROM pets WHERE id = ?').get(id);
    if (!pet) return res.status(404).send('No pet found with id ' + id);

    db.prepare('UPDATE pets SET name = ?, type = ?, dob = ? WHERE id = ?').run(name, type, dob, id);
    const updatedPet = db.prepare('SELECT * FROM pets WHERE id = ?').get(id);

    res.status(200).json(updatedPet);
});

app.delete('/api/pets/:id', (req, res) => {
    const { id } = req.params

    const pet = db.prepare('SELECT * FROM pets WHERE id = ?').get(id);
    if (!pet) return res.status(404).send('No pets found with id ' + id);

    //delete records and pet
    db.prepare('DELETE FROM records WHERE pet_id = ?').run(id);
    db.prepare('DELETE FROM pets WHERE id = ?').run(id);

    res.status(200).json({ message: 'Pet deleted successfully.' });
});



// ================ RECORDS endpoint ================
app.get('/api/records', (req, res) => {
    const petId = req.query.pet_id;
    let records;
    if(petId) {
        records = db.prepare('SELECT * FROM records WHERE pet_id = ?').all(petId);
    } else {
        records = db.prepare('SELECT * FROM records').all();
    }
    res.status(200).json(records);
});

app.post('/api/records', (req, res) => {
    const { name, type, date_given, reactions, severity, pet_id } = req.body

    if (!name || !type) {
        return res.status(400).json({
            error: 'Bad request',
            message: 'Record name and type required'
        });
    }

    const validDateGiven = date_given || null;
    if (type === 'vaccine' && !date_given ) {
        return res.status(400).json({
            error: 'Bad request',
            message: 'Vaccine record must include date administered'
        });
    }

    const validReactions = reactions || null;
    const validSeverity = severity || null;
    if(type === 'allergy' && !(validReactions && validSeverity)) {
        return res.status(400).json({
            error: 'Bad request',
            message: 'Allergy record must include reactions and severity'
        });
    }

    if (!pet_id) {
        return res.status(400).json({
            error: 'Bad request',
            message: 'No pet_id',
        });
    }
    const pet = db.prepare('SELECT * FROM pets WHERE id = ?').get(pet_id);
    if (!pet) return res.status(404).send('No pet found with id ' + pet_id);

    const result = db.prepare('INSERT INTO records (name, type, date_given, reactions, severity, pet_id) VALUES (?, ?, ?, ?, ?, ?)').run(name, type, validDateGiven, validReactions, validSeverity, pet.id);
    const createdRecord = db.prepare('SELECT * FROM records WHERE id = ?').get(result.lastInsertRowid);

    res.status(200).json(createdRecord);
});

app.put('/api/records/:id', (req, res) => {
    const { id } = req.params;
    const { name, type, date_given, reactions, severity } = req.body

    const record = db.prepare('SELECT * FROM records WHERE id = ?').get(id);

    if (!record) return res.status(404).send('No record found with id ' + id);

    // validate allergy
    const validReactions = reactions || null;
    const validSeverity = severity || null;
    if(type === 'allergy' && !(validReactions && validSeverity)) {
        return res.status(400).json({
            error: 'Bad request',
            message: 'Allergy record must include reactions and severity'
        });
    }

    db.prepare('UPDATE records SET name = ?, type = ?, date_given = ?, reactions = ?,  severity = ? WHERE id = ?').run(name, type, date_given, validReactions, validSeverity, id);
    const updatedRecord = db.prepare('SELECT * FROM records WHERE id = ?').get(id);

    res.status(200).json(updatedRecord);
});

app.delete('/api/records/:id', (req, res) => {
    const { id } = req.params

    const record = db.prepare('SELECT * FROM records WHERE id = ?').get(id);
    if (!record) return res.status(404).send('No record found with id ' + id);

    db.prepare('DELETE FROM records WHERE id = ?').run(id);

    res.status(200).json({ message: 'Record deleted successfully.' });
});

