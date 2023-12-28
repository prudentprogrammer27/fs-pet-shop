//enable strict mode
"use strict"


//imports
import express from 'express';
import fs from 'fs';


//global variables
const port = process.env.PORT || 9500;
const app = express();


//middleware
app.use(express.json())


//routes

//GET all pets info
app.get('/pets', (req, res) => {

    //use File System module to read file requested(GET), use error first callback
    fs.readFile('../pets.json', 'utf-8', (error, data) => {
        if (error) {
            //console message for the developer
            console.error("Error", error);
            //HTTP response for the client
            res.status(500).send("Internal Server Error")
        } else {
            console.log("GET request successful, here is your data:", data);
            res.status(200).send(data);
        };
    });
});

//GET specific pet info
app.get('/pets/:id', (req, res) => {
    let id = req.params.id;
    //the 'id' in the url is a string; convert to integer
    let index = parseInt(id);
    fs.readFile("../pets.json", "utf-8", (error, data) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).send("Internal Server Error");
        } else if (isNaN(index) || JSON.parse(data)[index] === undefined) {
            console.error("Not a valid entry");
            res.set('Conent-Type', 'text/plain')
            res.status(404).send("Invalid index")
        } else {
            console.log('GET successful, data:', data);
            res.status(200).send(JSON.parse(data)[index]);
        }
    })
})


//turn on server
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})