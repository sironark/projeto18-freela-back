
import db from "../database/database.connection.js"
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

export async function postSignup(req,res){
  const {name, email, password} = req.body;
    try {
      const verifyEmail = await db.query(`SELECT users.email 
      FROM users 
      WHERE email = $1;`,[email]);

      if (verifyEmail.rowCount) return res.status(409).send();
      
      const passwordHash = bcrypt.hashSync(password, 10);
      await db.query(`INSERT INTO users 
      (name, email, password) 
      VALUES ($1, $2, $3);`,[name, email, passwordHash]);
      
        res.status(201).send();

      } catch (err) {
        res.status(500).send(err.message);
      }
}

export async function postSignin(req,res){
  const {email, password} = req.body;
  const token = uuidv4();
  
  try {

      const verifyUser = await db.query(`SELECT * 
      FROM users 
      WHERE email = $1`,[email]);
      if(!verifyUser.rowCount) return res.status(401).send("User do not exist");
      if(!bcrypt.compareSync(password, verifyUser.rows[0].password)) return res.status(401).send('Wrong password or email');
     
      await db.query(`INSERT INTO sessions 
      ("userId", token) 
      VALUES ($1, $2);`,[verifyUser.rows[0].id, token])
      res.status(200).send({token});

    } catch (err) {
      res.status(500).send(err.message);
    }
}
