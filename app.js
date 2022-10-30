require("dotenv").config();

const express = require("express");
const app = express();
// //<=========Do this for EJS ==============>
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("view engine", "ejs");
//require spotify-web-api-node package here:
// npm i express spotify-web-api-node dotenv ejs express-ejs-layouts
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
const SpotifyWebApi = require('spotify-web-api-node');

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,              // .env hide the sensitive infos not for public
  clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));

// Our routes go here:
app.get("/", (req, res) => { 
    res.render("home");
});

// getting info about the artist from API
app.get('/artist-search', (req, res) => {
  console.log("it works", req.query) // refers to search object

spotifyApi
  .searchArtists(req.query.artist)
  .then(data => {
    console.log('The received data from the API: ', data.body.artists.items);

  //  if want to check what in deep nested image object 
  //console.log('The received data from the API: ', data.body.artists.items[0].images);

    // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    const resultFromApi = data.body.artists.items
    res.render('artist-search-results', {resultFromApi})
  })
  .catch(err => console.log('The error while searching artists occurred: ', err));
});

app.get('/albums/:artistId', (req, res) => {
  // .getArtistAlbums() code goes here
  spotifyApi
  .getAlbums(Id)
  .then(data => {
    console.log('Album information', data.body);
    res.render('album', albums )
  })
  .catch(err => console.log('The error while loading the album occurred: ', err));
});

app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
