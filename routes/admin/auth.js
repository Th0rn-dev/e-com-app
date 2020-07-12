const express = require("express");
const { check, validationResult } = require("express-validator");
const usersRepo = require("../../repositories/users");
const singupTemplate = require("../../views/admin/auth/singup");
const signinTemplate = require("../../views/admin/auth/singin");
const {
    requireEmail,
    requirePassword,
    requireConfirmation,
    requireEmailExists,
    requireValidPasswordForUser
} = require("./validator");

const router = express.Router();

router.get("/signup",
    (req, res) => {
    res.send(singupTemplate({ req }));
});

router.post("/signup",
    [
        requireEmail,
        requirePassword,
        requireConfirmation,
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send(signinTemplate({ req,  errors}));
        }

        const { email, password, confirm } = req.body;
        const existingUser = await usersRepo.getOnBy({ email });
        const user = await usersRepo.create({email, password});
        req.session.userId = user.id;
        res.send("Account created");
});

router.get("/signout", (req, res) => {
    req.session = null;
    req.send("You are logged out");
});

router.get("/singin", (req, res) => {
    res.send(signinTemplate({}));
});

router.post("/signin",
    [
        requireEmailExists,
        requireValidPasswordForUser
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send(singinTemplate({ errors }));
        }

        const { email } = req.body;
        const user = await usersRepo.getOnBy({ email });
        req.session.userId = user.id;
        res.send("You are signed in");
});

module.axports = router;