"use strict";

const express = require('express');
const db = require('../models');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { Op } = require("sequelize");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render('index', {});
});

app.get('/submit', (req, res) => {
  res.render('submit', {});
});

app.post('/submit', (req, res) => {
  const { name, description, author, publisher, mechanics, genre } = req.body;

  return db.System.create({ name, description, author, publisher, mechanics, genre })
    .then((system) => res.redirect('/'))
    .catch((err) => {
      console.error('***There was an error creating a system', JSON.stringify(contact))
      return res.status(400).send(err)
    });
});

app.post('/search', async (req, res) => {
  const { search, context } = req.body;
  let results;

  if (context == 'name') {
    results = await db.System.findAll({
      where: {
        name: {
          [Op.substring]: search
        }
      }
    });
  } else if (context == 'author') {
    results = await db.System.findAll({
      where: {
        author: {
          [Op.substring]: search
        }
      }
    });
  } else if (context == 'publisher') {
    results = await db.System.findAll({
      where: {
        publisher: {
          [Op.substring]: search
        }
      }
    });
  } else if (context == 'genre') {
    results = await db.System.findAll({
      where: {
        genre: {
          [Op.substring]: search
        }
      }
    });
  } else if (context == 'mechanics') {
    results = await db.System.findAll({
      where: {
        mechanics: {
          [Op.substring]: search
        }
      }
    });
  } else {
    results = await db.System.findAll({
      where: {
        description: {
          [Op.substring]: search
        }
      }
    });
  }



  res.render('search', { results: results });
});

app.get('/api/system', (req, res) => {
  return db.System.findAll()
    .then((systems) => res.send(systems))
    .catch((err) => {
      console.error('There was an error querying systems', JSON.stringify(err))
      return res.send(err)
    });
});

app.post('/api/system', (req, res) => {
  const { name, description, author, publisher, mechanics, genre } = req.body;

  return db.System.create({ name, description, author, publisher, mechanics, genre })
    .then((system) => res.send(system))
    .catch((err) => {
      console.error('***There was an error creating a system', JSON.stringify(contact))
      return res.status(400).send(err)
    });
});

app.listen(port, () => {
  console.info(`Balestar listening on port ${port}`);
});
