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

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json())
app.use(cors());

app.listen(3001, () => console.log('Server running on port 3001'));

// pets endpoint
app.get('/api/pets', (req, res) => {
    const pets = db.prepare('SELECT * FROM pets').all();

    res.json(pets);
});

app.get('/api/pets/:id', (req, res) => {
    const id = req.params.id;
    const pet = db.prepare('SELECT * FROM pets WHERE id = ?').get(id);

    if(!pet) return res.status(404).send('No pet found with id ' + id);

    res.json(pet)
})

app.put('/api/pets/:id', (req, res) => {
    const { id } = req.params;
    const { name, type, dob } = req.body

    const pet = db.prepare('SELECT * FROM pets WHERE id = ?').get(id);

    if (!pet) return res.status(404).send('No pet found with id ' + id);

    db.prepare('UPDATE pets SET name = ?, type = ?, dob = ? WHERE id = ?').run(name, type, dob, id);
    const updatedPet = db.prepare('SELECT * FROM pets WHERE id = ?').get(id);

    res.json(updatedPet);
});

// Create
// Delete

// RECORDS endpoint
app.get('/api/records', (req, res) => {
    const petId = req.query.pet_id;
    const records = db.prepare('SELECT * FROM records WHERE pet_id = ?').all(petId);
    res.json(records);
});

app.put('/api/records/:id', (req, res) => {
    const { id } = req.params;
    const { name, type, date_given, reactions, severity } = req.body

    const record = db.prepare('SELECT * FROM records WHERE id = ?').get(id);

    if (!record) return res.status(404).send('No record found with id ' + id);

    // validate allergy
    const validReactions = reactions || null;
    const validSeverity = severity || null;

    if(type === 'allergy' && !validReactions && !validSeverity) {
        return res.status(404).send('Allergy record must include reactions and severity');
    }

    db.prepare('UPDATE records SET name = ?, type = ?, date_given = ?, reactions = ?,  severity = ? WHERE id = ?').run(name, type, date_given, validReactions, validSeverity, id);
    const updatedRecord = db.prepare('SELECT * FROM records WHERE id = ?').get(id);

    res.json(updatedRecord);
});

// Create/Add (pet id)
// Delete
