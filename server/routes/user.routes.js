const UserController = require("../controllers/user.controller");
const {authenticate} = require("../config/jwt.config");
const User = require("../models/user.model");

module.exports = (app) => {
    app.get("/api/allusers", UserController.findAllUsers);
    app.put("/api/users/editUser/:id", UserController.editUser )
    app.post("/api/users/register", UserController.register);
    app.post("/api/users/login", UserController.login);
    app.post("/api/users/logout", UserController.logout);
    app.get("/api/users/secure", authenticate,  UserController.getLoggedInUser);
    app.get("/api/users/:id", UserController.getOneUser);

}