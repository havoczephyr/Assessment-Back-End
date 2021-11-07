const express = require("express");
const cors = require("cors");

const app = express();
const {getCompliments,getFortuneCookie, fetchCandy, createCandy, deleteCandy, updateButton} = require('./controllers/controller.js')


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", getCompliments)
app.get("/api/fortune-cookie", getFortuneCookie)
app.get("/api/candy", fetchCandy)
app.post("/api/candy", createCandy)
app.put("/api/push-button/update", updateButton)
app.delete("/api/candy/:id", deleteCandy)


const SERVER_PORT = 4000
app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));


