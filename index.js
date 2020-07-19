const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");
const adminProductsRouter = require("./routes/admin/products");
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(
        cookieSession({
        keys: ["dddgdgdgdgg"]
    }),
);

app.use(authRouter);
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);


app.listen(3000, () => {
    console.log("Listening");
})