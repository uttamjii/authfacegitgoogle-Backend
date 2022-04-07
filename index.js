
if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const cookieSession = require("cookie-session")
const express = require("express");
const passport = require("passport");
const app = express();
const cors = require("cors");
const passportSetup = require("./passport")
const authRoutes = require("./routes/auth");

app.use(cookieSession({
    name: "session",
    keys: ["lama"],
    maxAge: 24 * 60 * 60 * 1000
}));


app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "https://login.netlify.app",
    // origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));


app.use("/auth", authRoutes);



app.listen(5000, () => {
    console.log("server is running on port 5000")
})