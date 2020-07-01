const express = require("express");
 const app = express();
 const bodyParser = require("body-parser");
 app.use(bodyParser.urlencoded({ extended: true }));

 app.get("/", (req, res) => {
        res.send(`
            <div>
                <form method="post">
                    <input name="email" placeholder="email" />
                    <input name="password" placeholder="password" />
                    <input name="confirm " placeholder="password confirmation" />
                    <button>Sing Up</button>
                </form>
            </div>
        `);
 });


 app.post("/", (req, res) => {
     console.log(req.body);
     res.send("Account created");
 })


 app.listen(3000, () => {
     console.log("Listening");
 })