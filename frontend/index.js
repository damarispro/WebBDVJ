import express from "express";

const app = express();

app.use(express.static("public"));

const PORT = 5500;

app.listen(PORT, () => {
    console.log("http://localhost:" + PORT);
});