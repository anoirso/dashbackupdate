const express = require('express');
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { user, refreshToken, accessToken , personalInfos} = new PrismaClient();
const exportedMethods = require('./Methods')
const bcrypt = require("bcrypt");



const registerRouter = express.Router();




registerRouter.get('/', (req, res, next) => {
    res.json({message : 'You are in the registration router'})

})

registerRouter.post("/api/register", async (req, res) => {
    const { email, password } = req.body;
    try {
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
            password: await bcrypt.hash(password,10),
            username: email,
            isAdmin: false,
    
          },
        });
        const information = await personalInfos.create({
          data : {
            userId : newUser.id
          }
        })
        const accessToken = exportedMethods.generateAccessToken(newUser);
        const refreshTokenG = exportedMethods.generateRefreshToken(newUser);
        console.log(accessToken)
        console.log(refreshTokenG)
        res.cookie("AccessT", accessToken);
        res.cookie("AccessRefreshT", refreshToken);
        res.json({
          username: email,
          isAdmin: false,
          email: email,
          userDetails : information,
          accessToken,
          refreshTokenG,
          
        });
    
      }
      
    } catch (error) {
      console.log(error)
      
    }
   
  });



module.exports = registerRouter;