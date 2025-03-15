const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5433;  

app.use(cors());

app.use(express.json());

const pool = new Pool({
  user: 'postgres',         
  host: 'localhost',            
  database: 'postgres',     
  password: 'itfest', 
  port: 5432,                   
});

app.post('/logare', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ token: 'some-jwt-token' });  
    } else {
      res.status(400).json({ message: 'Username sau parola incorecte' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/creareCont', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
      [username, email, password]
    );

    res.status(201).json({ message: 'Cont creat cu succes', id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Serverul rulează pe portul ${port}`);
});