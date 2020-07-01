const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const usersRepo = require("./repositories/users.js")


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send(`
            <div>
                <form method="post">
                    <input name="email" placeholder="email" />
                    <input name="password" placeholder="password" />
                    <input name="confirm" placeholder="password confirmation" />
                    <button>Sing Up</button>
                </form>
            </div>
        `);
});


app.post("/", async (req, res) => {
    const {email, password, confirm} = req.body;
    const existingUser = await usersRepo.getOnBy({email});

    if (existingUser) {
        return res.send('Email in use!');
    }
    if (pasword !== confirm) {
        return res.send("Passwords mast match");
    }

    res.send("Account created");
})


app.listen(3000, () => {
    console.log("Listening");
})