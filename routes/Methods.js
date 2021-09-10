const { PrismaClient } = require("@prisma/client");
const { user, refreshToken, accessToken } = new PrismaClient();
const jwt = require("jsonwebtoken");
const exportedServices = require('./Permissions')
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
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You are not authenticated");
    }
  },
  generateAccessToken: (user) => {
      return jwt.sign({ id: user.id, isAdmin: user.isAdmin , permissionsOfUser : exportedServices.mapOfPermissions().get(user.subscriptionType)}, "mySecretKey", {
        expiresIn: "30m",
      });

  },
  generateRefreshToken : (user) => {
      return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");

  },
  // Verify function must always applied before verifyPermissions function
  verifyPermissions : (permissionRequired) => {
    return async (req, res, next) => {
     const permissions = req.user.permissionsOfUser
     console.log(permissions)
     if (!permissions.includes(permissionRequired)) {
       res.status(411).json({message : 'Request forbidden, you do not have the permission for that'})
     }
     else {
       next();
     }
    }
  }
};
