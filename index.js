/* -------------------------------- Libraries ------------------------------- */
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 4005;

app.use(express.static("public"));
/* `app.set('view engine', 'ejs')` is setting the view engine for the Express application to EJS
(Embedded JavaScript). This means that when rendering views, Express will use EJS as the template
engine to generate HTML dynamically. */
app.set("view engine", "ejs");

/* --------------------------------- Routes --------------------------------- */

async function loadCharacters(url) {
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.log(error);
    return []; // En caso de error, devolver un array vacío
  }
}

// Get Home
app.get("/", async (req, res) => {
  // const response = await axios.get("https://rickandmortyapi.com/api/character");
  const url = "https://rickandmortyapi.com/api/character";
  const character = await loadCharacters(url);
  // const character = response.data.results;
  res.render("index.ejs", { character });
  // res.sendFile(__dirname + '/public/app.html')
});

// Character Page
app.get("/character/:id", async (req, res) => {
  const idCharacter = req.params.id;
  const url = `https://rickandmortyapi.com/api/character/${idCharacter}`;

  try {
    const response = await axios.get(url);
    const character = response.data;
    res.render("character.ejs", { character });
  } catch (error) {
    console.log(error);
  }
});

// Search Character by ID
app.get("/character", async (req, res) => {
  const id = req.query.search;
  const url = `https://rickandmortyapi.com/api/character/${id}`;

  try {
    const response = await axios.get(url);
    const character = response.data;
    res.render("character.ejs", { character });
  } catch (error) {
    console.log(error);
  }
});

// Search Character by filter
app.get("/characterSearchBy", async (req, res) => {
  const characterFilter = req.query.filter;
  const filterLabel = req.query["filter-label"];

  const url = `https://rickandmortyapi.com/api/character/?page=1&${filterLabel}=${characterFilter}`;
  console.log(url);
  try {
    const character = await loadCharacters(url);
    // const response = await axios.get(url);
    // const character = response.data;
    res.render("index.ejs", { character });
  } catch (error) {
    console.log(error);
  }
});

// Run server
app.listen(PORT, () => {
  try {
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
