const express = require("express");
const usersRepo = require("../../repositories/users");
const singupTemplate = require("../../views/admin/auth/singup");
const signinTemplate = require("../../views/admin/auth/singin");

const router = express.Router();

router.get("/signup", (req, res) => {
    res.send(singupTemplate({ req }));
});


router.post("/signup", async (req, res) => {
    const {email, password, confirm} = req.body;
    const existingUser = await usersRepo.getOnBy({ email });

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

router.get("/signout", (req, res) => {
    req.session = null;
    req.send("You are logged out");
});

router.get("/singin", (req, res) => {
    res.send(signinTemplate());
});

router.post("/signin", async (req, res) => {
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

module.axport = router;