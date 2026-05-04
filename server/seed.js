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

console.log('Database seeded successfully!');
