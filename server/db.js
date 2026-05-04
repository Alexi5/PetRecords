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

import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.resolve("data/app.db"), {
    verbose: console.log
});

// write-ahead mode
db.pragma('journal_mode = WAL');

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('admin', 'user')) DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS pets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        owner_id INTEGER NOT NULL,
        dob DATETIME,
        FOREIGN KEY (owner_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('vaccine', 'allergy')) DEFAULT 'vaccine',
        date_given DATETIME DEFAULT CURRENT_TIMESTAMP,
        reactions TEXT,
        severity TEXT CHECK(severity IN ('mild', 'severe')) DEFAULT NULL,
        pet_id INTEGER NOT NULL,
        FOREIGN KEY (pet_id) REFERENCES pets(id),
        CHECK (type != 'allergy' OR reactions IS NOT NULL),
        CHECK (type != 'allergy' OR severity IS NOT NULL)
    );
`);

export default db;