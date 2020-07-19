const express = require("express");
const productsRepo = require("../repositories/products");
const productsIndexTemplate = require("../views/products/index");

const router = express.Router();

router.get("/", async (req, res) => {
    const products = productsRepo.getAll();
    req.send(productsIndexTemplate({ products }));
});

module.exports = router;