import db from "../database/database.connection.js";

export async function insertService(title,description,price,userId){
    return db.query(`INSERT INTO services
    (title, "userId", description, price)
    VALUES ($1, $2, $3, $4);`,
    [title, userId, description, price]);
}

export async function searchServiceId(userId){
    return db.query(`SELECT id 
    FROM services 
    WHERE "userId" = $1;`,[userId]);
}

export async function insertPhoto(ph, serviceId){
    return db.query(`INSERT INTO photos
    ("serviceId", "urlPhoto")
    VALUES ($1, $2);`, [serviceId, ph]);
}

export async function selectServiceByid(id){
    return db.query(`SELECT services.title, services.description, services.price, users.name, users.city, users.phone 
    FROM services
    JOIN users ON services."userId" = users.id 
    WHERE services.id = $1;`,[id])
}

export async function verifyService(id){
    return db.query(`SELECT *
    FROM services 
    WHERE id = $1;`,[id])
}

export async function getFullservices(){
    return db.query(`SELECT services.id AS "serviceId", services.title, services.description, services.price, users.name, users.city
    FROM services
    JOIN users ON users.id = services."userId"
    GROUP BY title, description, price, users.name, users.city, services.id
    ;`)
}


export async function getAllPhotos(){
    return await db.query(`SELECT *
    FROM photos;`)
}