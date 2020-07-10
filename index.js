const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
    keys: ["dddgdgdgdgg"]
}));

app.use(authRouter);

app.listen(3000, () => {
    console.log("Listening");
})