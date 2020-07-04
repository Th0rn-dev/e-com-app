const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const usersRepo = require("./repositories/users.js")


app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
    keys: ["dddgdgdgdgg"]
}));

app.get("/singup", (req, res) => {
    res.send(`
            <div>
                Your id is: ${req.session.userId}
                <form method="post">
                    <input name="email" placeholder="email" />
                    <input name="password" placeholder="password" />
                    <input name="confirm" placeholder="password confirmation" />
                    <button>Sing Up</button>
                </form>
            </div>
        `);
});


app.post("/singup", async (req, res) => {
    const {email, password, confirm} = req.body;
    const existingUser = await usersRepo.getOnBy({email});

    if (existingUser) {
        return res.send('Email in use!');
    }
    if (pasword !== confirm) {
        return res.send("Passwords mast match");
    }
    // Create a user in our user repo to represent
    const user = await usersRepo.create({email, password});
    req.session.userId = user.id;
    res.send("Account created");
});

app.get("/singout", (req, res) => {
    req.session = null;
    req.send("You are logged out");
});

app.get("/singin", (req, res) => {
    res.send(`
     <div>
        <form method="post">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <button>Sing In</button>
        </form>
      </div>
    `);
});

app.post("/singin", async (req, res) => {
    const { email, password } = req.body;
    const user = await usersRepo.getOnBy({ email });

    if (!user) {
        return res.send("Email not found");
    }

    const validPassword = await usersRepo.comparePasswords(
        user.password,
        password
    );
    if (!validPassword) {
        return res.send("Invalid password");
    }

    req.session.userId = user.id;
    res.send("You are signed in");
});



app.listen(3000, () => {
    console.log("Listening");
})