const express = require("express");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { user, refreshToken, accessToken } = new PrismaClient();
const funcs = require("../app");
const exportedMethods = require("./Methods");
const bcrypt = require("bcrypt");
const signRouter = express.Router();

signRouter.get("/", (req, res) => {
  res.send({ message: "Route is working" });
});

// Login Function

const domainName = process.env.DOMAIN_NAME || 'run.app'

signRouter.post("/api/login", async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  var credentialsAccepted = false;
  const userFound = await user.findFirst({
    where: {
      AND: [
        {
          OR: [
            {
              username: {
                equals: usernameOrEmail,
                mode: "insensitive",
              },
            },
            {
              email: {
                equals: usernameOrEmail,
                mode: "insensitive",
              },
            },
          ],
        }
      ],
    },
  });
  if (!userFound) {
    res.status(407).status({message : 'No user is found with this name '})
  }
  if (await bcrypt.compare(password, userFound.password)) {
    credentialsAccepted = true
  }
  if (credentialsAccepted) {
    console.log("Reached here");
    const accessToken = exportedMethods.generateAccessToken(userFound);
    const refreshTokenG = exportedMethods.generateRefreshToken(userFound);
    res.cookie("AccessT", accessToken,{domain : domainName});
    res.cookie("AccessRefreshT", refreshToken,{domain : domainName});
    const tokenAdded = await refreshToken.create({
      data: {
        referesh_token: refreshTokenG,
        user_id: userFound.id,
      },
    });
    res.json({
      username: userFound.username,
      isAdmin: userFound.is_admin,
      email: userFound.email,
      userDetails: userFound.userDetails,
      accessToken,
      refreshTokenG,
    });
  } else {
    res.status(400).json("Username or password incorrect!");
  }
});

// Logout function

signRouter.post("/api/logout", exportedMethods.verify, async (req, res) => {
  const refreshTokenBody = req.body.token;
  await refreshToken.updateMany({
    where: {
      referesh_token: refreshTokenBody,
    },
    data: {
      used: true,
    },
  });
  const tokenToBeRemoved = req.headers.authorization.replace("Bearer ", "");
  await accessToken.create({
    data: {
      access_token: tokenToBeRemoved,
      user_id: req.user.id,
    },
  });

  res.json({ message: "You logged out successfully" });
});

module.exports = signRouter;
