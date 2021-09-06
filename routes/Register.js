const express = require('express');
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { user, refreshToken, accessToken } = new PrismaClient();
const exportedMethods = require('./Methods')


const registerRouter = express.Router();




registerRouter.get('/', (req, res, next) => {
    res.json({message : 'You are in the registration router'})

})

registerRouter.post("/api/register", async (req, res) => {
    const { email, password } = req.body;
    const emailExsits = await user.findFirst({
      where: {
        email: email,
      },
    });
  
    if (emailExsits) {
      res.status(405).json({ message: "Email alrady exsits" });
    } else {
      const newUser = await user.create({
        data: {
          email: email,
          password: password,
          username: email,
          is_admin: false,
        },
      });
      const accessToken = exportedMethods.generateAccessToken(newUser);
      const refreshTokenG = exportedMethods.generateRefreshToken(newUser);
      res.cookie("AccessT", accessToken);
      res.cookie("AccessRefreshT", refreshToken);
      res.json({
        username: email,
        isAdmin: false,
        email: email,
        accessToken,
        refreshTokenG,
      });
  
    }
  });



module.exports = registerRouter;