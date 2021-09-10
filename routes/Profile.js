const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { user, refreshToken, accessToken, personalInfos } = new PrismaClient();
const exportedMethods = require("./Methods");

const profileRouter = express.Router();

profileRouter.get("/", (req, res) => {
    res.json({ message: "You have reached the the prfile router" });
});

profileRouter.put("/setup", exportedMethods.verify, async (req, res) => {
    // The logic to check if the username is repeated needs to be evaluated later
    const {username, firstName,lastName, phoneNumber,role,usernameChanged} = req.body;
    console.log(req.body);
    if (usernameChanged) {
        const userFound = await user.findFirst({
            where: {
                username: username,
            },
        });
        console.log(userFound)
        if (userFound) {
            console.log('imgain')
            res.status(800).json({ message: "username already used" });
        }
        await user.update({
            where : {
                id : req.user.id
            },
            data : {
                username,
                role,
            }
        })
    }
    const changedDetails = await personalInfos.update({
        where : {
            userId : req.user.id
        },
        data : {
            firstName : firstName,
            lastName : lastName,
            phoneNumber : phoneNumber
        }
    }) 

    res.json({message : 'Changes went into effect', user : changedDetails})
});

profileRouter.get('/try_permission' ,exportedMethods.verify , exportedMethods.verifyPermissions('levelI') , async (req, res) => {
    res.json({message : 'Your request went successfully'})
})

module.exports = profileRouter;
