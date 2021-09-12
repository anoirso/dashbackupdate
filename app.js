const { Pool, Client } = require("pg");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { PrismaClient } = require("@prisma/client");
const { user, refreshToken, accessToken } = new PrismaClient();
const { mapUser } = require("./functions");
const app = express();

const maps = require('./routes/Permissions'); 

const signRouter = require("./routes/SignInOut");
const authentication = require('./routes/AuthenticationManagement');
const registerRouter = require('./routes/Register');
const profileRouter = require('./routes/Profile');

const enVar = process.env.POST_KEY
const port = process.env.PORT || 8000

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/sign", signRouter);
app.use('/authentication' ,authentication);
app.use('/register',registerRouter);
app.use('/profile' ,profileRouter);





app.get("/", (req, res) => {
  res.json({ message: enVar });
});
app.listen(port, (req, res) => {});





