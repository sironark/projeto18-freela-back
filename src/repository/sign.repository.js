import db from "../database/database.connection.js";


export async function signin(email) {

	return db.query(`SELECT * 
      FROM users 
      WHERE email = $1`,[email]);
}

export async function insertSignin(verifyUser, token) {

	return db.query(`INSERT INTO sessions 
    ("userId", token) 
    VALUES ($1, $2);`,[verifyUser, token])
}

export async function verifyEmail(email) {

	return db.query(`SELECT users.email 
    FROM users 
    WHERE email = $1;`,[email]);
}

export async function insertSignup(name, email, city, phone, passwordHash) {

	return db.query(`INSERT INTO users 
    (name, email, city, phone, password) 
    VALUES ($1, $2, $3, $4, $5);`,[name, email,city, phone, passwordHash]);
}