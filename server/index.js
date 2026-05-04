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
*   reactions: "text"
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
// View
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
// Create
// Edit
// Delete

// records endpoint
// View
// Create/Add (pet id)
// Edit
// Delete
