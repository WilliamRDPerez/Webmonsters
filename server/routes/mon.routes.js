const MonController = require("../controllers/mon.controller");
const Mon = require("../models/mon.model");
const {authenticate} = require("../config/jwt.config");


module.exports = (app) => {
    app.post("/api/mons", authenticate, MonController.createMon);
    app.get("/api/mons", MonController.getAllMons);
    app.get("/api/monsbyuser/:username", authenticate, MonController.getAllMonsByUser)
    app.get("/api/mons/:id", MonController.getOneMon);
    app.put("/api/mons/:id", MonController.editMon);
    app.delete("/api/mons/:id", MonController.deleteMon);
    
}