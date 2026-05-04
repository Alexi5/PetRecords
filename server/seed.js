import db from './db.js'

const default_users = [
    { name: 'Alexis J', role: 'admin' },
    { name: 'Kristen K', role: 'user' },
    { name: 'Nova KJ', role: 'user' },
    { name: 'Jade KJ', role: 'user' },
];

const insertIntoUsers = db.prepare('INSERT INTO users (name, role) VALUES (?, ?)');
const insertUsers = db.transaction((users) => {
    for (const user of users) {
        insertIntoUsers.run(user.name, user.role);
    }
})
insertUsers(default_users);

const users = db.prepare('SELECT * FROM users').all();
const pets = [
    { name: 'Demi', type: 'dog', owner_id: users[0].id, dob: "2020-03-15" },
    { name: 'Vita', type: 'dog', owner_id: users[0].id, dob: "2019-07-22" },
    { name: 'Frank', type: 'cat', owner_id: users[2].id, dob: null },
    { name: 'Peas', type: 'gerbil', owner_id: users[3].id, dob: null },
    { name: 'HeyHey', type: 'rooster', owner_id: users[3].id, dob: null },
];

const insertIntoPets = db.prepare('INSERT INTO pets (name, type, owner_id, dob) VALUES (?, ?, ?, ?)');
const insertPets = db.transaction((pets) => {
    for (const pet of pets) {
        insertIntoPets.run(pet.name, pet.type, pet.owner_id, pet.dob);
    }
})
insertPets(pets);

const allPets = db.prepare('SELECT * FROM pets').all();
const records = [
    { name: 'vax1', type: 'vaccine', date_given: "2026-01-15", reactions: null, severity: null, pet_id: allPets[0].id },
    { name: 'grapes', type: 'allergy', date_given: null, reactions: "hives, rash", severity: ["mild"], pet_id: allPets[0].id },
    { name: 'vax2', type: 'vaccine', date_given: "2025-08-01", reactions: null, severity: null, pet_id: allPets[0].id },
    { name: 'flea soap', type: 'allergy', date_given: null, reactions: "rash, redness", severity: ["severe"], pet_id: allPets[1].id },
    { name: 'vax3', type: 'vaccine', date_given: "2025-04-11", reactions: null, severity: null, pet_id: allPets[1].id },
    { name: 'pollen', type: 'allergy', date_given: null, reactions: "redness, sneezing", severity: ["mild"], pet_id: allPets[3].id },
];

const insertIntoRecords = db.prepare('INSERT INTO records (name, type, date_given, reactions, severity, pet_id) VALUES (?, ?, ?, ?, ?, ?)');
const insertRecords = db.transaction((records) => {
    for (const record of records) {
        insertIntoRecords.run(record.name, record.type, record.date_given, record.reactions, record.severity, record.pet_id)
    }
});
insertRecords(records)

console.log('Database seeded successfully!');
