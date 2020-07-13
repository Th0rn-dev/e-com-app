const express = require("express");

const { handleErrors } = require("./middleware");
const usersRepo = require("../../repositories/users");
const signupTemplate = require("../../views/admin/auth/singup");
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
    res.send(signupTemplate({ req }));
});

router.post("/signup",
    [
        requireEmail,
        requirePassword,
        requireConfirmation,
    ],
    handleErrors(signupTemplate),
    async (req, res) => {
        const { email, password } = req.body;
        const user = await usersRepo.create({ email, password });
        req.session.userId = user.id;
        res.redirect("/admin/products");
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
    handleErrors(signinTemplate),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send(singinTemplate({ errors }));
        }

        const { email } = req.body;
        const user = await usersRepo.getOnBy({ email });
        req.session.userId = user.id;
        res.redirect("/admin/products");
});

module.axports = router;