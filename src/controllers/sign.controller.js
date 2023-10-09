
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { insertSignin, insertSignup, signin, verifyEmail } from "../repository/sign.repository.js";

export async function postSignup(req,res){
  const {name, email, password, city, phone} = req.body;
    try {
      // verify unique email
      const verifymail = await verifyEmail(email);
      if (verifymail.rowCount) return res.status(409).send();
      
      // hash password
      const passwordHash = bcrypt.hashSync(password, 10);

      // insert data user
      await insertSignup(name, email, city, phone, passwordHash)
      
        res.status(201).send();

      } catch (err) {
        res.status(500).send(err.message);
      }
}

export async function postSignin(req,res){
  const {email, password} = req.body;
  const token = uuidv4();
  
  try {
      // verify if there is a user and correct password
      const verifyUser = await signin(email)
      if(!verifyUser.rowCount) return res.status(401).send("User do not exist");
      if(!bcrypt.compareSync(password, verifyUser.rows[0].password)) return res.status(401).send('Wrong password or email');
     
      // insert token to table
      await insertSignin(verifyUser.rows[0].id, token)

      res.status(200).send(token);
      
    } catch (err) {
      res.status(500).send(err.message);
    }
}
