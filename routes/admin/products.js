const express = require("express");
const { validatorResult } = require("express-validator");
const productsRepo = require("../../repositories/products");
const productsNewTemplate = require("../../views/admin/products/new");
const { requireTitle, requirePrice } = require("./validator");


const router = express.Router();

router.get("/admin/products", (req, res) => {

});

router.get("/admin/products/new", (req, res) => {
    res.send(productsNewTemplate({}));
});

router.post("/admin/products/new", [requireTitle, requirePrice], (req, res) => {
    const errors = validatorResult(req);
    console.log(errors);
    res.send("submited");
});


module.exports = router;