
const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));   // parse and translate data from requests

app.get("/currenttime", function(req, res){

    res.send("<h1>The current time is " + new Date().toISOString() + ".</h1>");

});  // localhost:3000/currenttime

app.get("/", function(req, res)  {
    res.send("<form action='store-user' method='POST'><label>Your name? </label><input type='text' name='username'><button>Submit</button></form>")

});  // localhost:3000

app.post("/store-user", function(req, res) {
    // extract the data that was submitted

    const userName = req.body.username;

    const filePath = path.join(__dirname, "data", "users.json");
    const fileData = fs.readFileSync(filePath);

    const existingUsers = JSON.parse(fileData);

    existingUsers.push(userName);

    console.log(existingUsers);

    fs.writeFileSync(filePath, JSON.stringify(existingUsers));

    res.send("<h2>Username stored.</h2>");

});

app.get("/show-users", function(req, res) {

    const filePath = path.join(__dirname, "data", "users.json");
    const fileData = fs.readFileSync(filePath);

    const existingUsers = JSON.parse(fileData);
    console.log(existingUsers);
    let output = "<ul>";

    // existingUsers.forEach(element => {
    //     console.log(element);
    //     output = output + "<li> "+ element + "</li>";
    // });

    for (const user of existingUsers) {

        output += "<li> "+ user + "</li>";

    }

    output = output + "</ul>";

    res.send("<h2>Users list: </h2>" + output );

});
 
app.listen(3000);


