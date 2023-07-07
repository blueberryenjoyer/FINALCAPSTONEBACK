const express = require("express");
const usersRouter = express.Router();
const { getAllUsers } = require("../db/getData");

usersRouter.get("/users", async (req, res) => {
    try {
        const allUsers = await getAllUsers();

        if (allUsers && allUsers.length) {
            allUsers.forEach((e) => {
                delete e.password;
            });
            res.send(allUsers);
        } else {
            res.send("api received an empty array thats bad");
        }
        //this is just the password deleting script from the code resource
    } catch (error) {
        throw error;
    }
});

module.exports = usersRouter;