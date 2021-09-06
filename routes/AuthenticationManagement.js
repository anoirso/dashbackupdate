const express = require("express");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { user, refreshToken, accessToken } = new PrismaClient();

const authentication = express.Router();

const exportedMethods = require('./Methods')
////////////


authentication.post("/api/checklogin",exportedMethods.verify , async (req, res) => {
  const userResponse = await user.findFirst({
    where: {
      id: req.user.id,
    },
  });
  console.log(userResponse);
  const detailsTobeSent = {
    email: userResponse.email,
    username: userResponse.username,
    isAdmin: userResponse.is_admin,
  };
  res.status(200).send(userResponse ? detailsTobeSent : null);
});

authentication.post("/api/refreshToken", async (req, res) => {
  const refreshTokenRequest = req.body.token;
  if (!refreshTokenRequest)
    return res.status(401).json("You are not authenticated");
  const tokenFound = await refreshToken.findFirst({
    where: {
      referesh_token: refreshTokenRequest,
    },
  });
  if (tokenFound.used || !tokenFound) {
    return res.status(403).json("Refresh token is not valid");
  }

  jwt.verify(refreshTokenRequest, "myRefreshSecretKey", async (err, user) => {
    await refreshToken.updateMany({
      where: {
        referesh_token: refreshTokenRequest,
      },
      data: {
        used: true,
      },
    });
    const numberOfTokenStored = await refreshToken.count();
    console.log(numberOfTokenStored);
    if (numberOfTokenStored == 70) {
      await refreshToken.deleteMany({
        where: {
          used: true,
        },
      });
    }
    const newAccessToken = exportedMethods.generateAccessToken(user);
    const newRefreshToken = exportedMethods.generateRefreshToken(user);
    await refreshToken.create({
      data: {
        referesh_token: newRefreshToken,
        user_id: user.id,
      },
    });
    res.cookie("AccessT", newAccessToken);
    res.cookie("AccessRefreshT", newRefreshToken);
    res.status(200).json({
      message: "Tokens generated",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
});


module.exports = authentication;


