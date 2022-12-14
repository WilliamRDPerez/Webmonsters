const Mon = require("../models/mon.model");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = {

    createMon: (req, res) => {

        const newMonObject = new Mon(req.body);


        newMonObject.createdBy = req.jwtpayload.id


        newMonObject.save()
            .then((newMon) =>{
                console.log(newMon);
                res.json(newMon);
            })
            .catch((err) => {
                res.status(400).json({err});
            })
    },

    getAllMons: (req, res) => {
        Mon.find({})
            .populate("createdBy", "username email")
            .then((allMons) => {
                console.log(allMons);
                res.json(allMons);
            })
            .catch((err) => {
                res.status(400).json({err});
            })
    },

    getOneMon: (req, res) => {
        Mon.findOne({_id: req.params.id})
            .then((oneMon) => {
                console.log(oneMon);
                res.json(oneMon);
            })
            .catch((err) => {
                res.status(400).json({err});
            })
    },

    editMon: (req, res) => {
        Mon.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
            .then((editedMon) => {
                console.log(editedMon)
                res.json(editedMon)
            })
            .catch((err) => {
                res.status(400).json({err});
            })
    },

    deleteMon: (req, res) => {
        Mon.deleteOne({_id: req.params.id})
            .then((deletedMon) => {
                console.log(deletedMon);
                res.json(deletedMon)
            })
            .catch((err) => {
                res.status(400).json({err});
            })
    },

    getAllMonsByUser: (req,res) => {
        if(req.jwtpayload.username !== req.params.username){
            User.findOne({username: req.params.username})
                .then((userNotLoggedIn) => {
                    Mon.find({createdBy: userNotLoggedIn._id})
                        .populate("createdBy", "username")
                        .then((allMonsFromUser) => {
                            console.log(allMonsFromUser);
                            res.json(allMonsFromUser);
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json(err);
                        })
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                })
        }
        else{
            Mon.find({createdBy: req.jwtpayload.id})
                .populate("createdBy", "username")
                .then((allMonsFromLoggedInUser) => {
                    console.log(allMonsFromLoggedInUser);
                    res.json(allMonsFromLoggedInUser);
                })
                .catch((err) =>{
                    console.log(err);
                    res.status(400).json(err);
                })
        }
    } 
    
}
