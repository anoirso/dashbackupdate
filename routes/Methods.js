const { PrismaClient } = require("@prisma/client");
const { user, refreshToken, accessToken } = new PrismaClient();
const jwt = require("jsonwebtoken");

module.exports = {
  verify: async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, "mySecretKey", async (err, user) => {
        if (err) {
          return res.status(401).json("Json token is not valid");
        }
        const tokenFound = await accessToken.findFirst({
          where: {
            access_token: authHeader.replace("Bearer ", ""),
          },
        });

        if (tokenFound) {
          res
            .status(407)
            .json({
              message: "Token has been used before and not valid anymore",
            });
        }
        console.log("You are authenticated now");
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You are not authenticated");
    }
  },
  generateAccessToken: (user) => {
      return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "mySecretKey", {
        expiresIn: "30m",
      });

  },
  generateRefreshToken : (user) => {
      return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");

  }
};
