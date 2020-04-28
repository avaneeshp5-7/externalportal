const express = require("express");
const rout = express.Router();
const bodyparser = require('body-parser')
const mongojs = require('mongojs');
rout.use(bodyparser.json());
conn = mongojs("mongodb://logicode:logicode123@ds331735.mlab.com:31735/logicodes");
rout.post("/login_url", (req, res) => {
    conn.user.find({ Email: req.body.Email }, (err, result) => {
        console.log(result.length)
        if (result.length === 1) {
            res.send({
                success: true,
                result: result
            })
        }
        else {
            res.send({
                success: false,
                message: "Email or password is wrong"
            })
        }
    })
});
rout.get('/profile_url', (req, res) => {
    conn.user.find((err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send({
                success: true,
                result: result
            })
        }
    })
})
rout.post('/user_register_url', (req, res) => {
    conn.user.find({ Email: req.body.Email }, (errs, ress) => {
        if (ress.length == 1) {
            res.send({
                success: false,
                message: "User Duplicate"
            })
        }
        else {
            conn.user.find({}, { _id: 1 }).sort({ _id: -1 }).limit(1, function (e, r) {
                if (r == 0) {
                    var val = 0
                }
                else {
                    val = r[0]._id
                }
                val++
                conn.user.save({
                    _id: val,
                    first_name: req.body.first_name,
                    middle_name: req.body.middle_name,
                    last_name: req.body.last_name,
                    Email: req.body.Email,
                    Password: req.body.Password,
                    contact: req.body.contact
                }, (er, ress) => {
                    if (er) {
                        res.send({
                            success: false,
                            message: "Somthing went wrong",
                            result: ress
                        })
                    }
                    else {
                        res.send({
                            success: true,
                            message: "User Register !"
                        })
                    }
                })
            })
        }
    })
})

rout.post('/update_url', (req, res) => {
    data = req.body
    conn.user.update(data[0], { $set: data[1] }, (err, result) => {
        if (err) {
            res.send({
                success: false,
                message: "Something went wrong !"
            })
        }
        else {
            res.send({
                success: true,
                result: result
            })
        }
    })
})
rout.post('/user_remove_url', (req, res) => {
    data = req.body
    conn.user.remove(data, (err, result) => {
        if (err) {
            res.send({
                success: false,
                message: "Something went wrong !"
            })
        }
        else {
            res.send({
                success: true,
                result: result
            })
        }
    })
})
module.exports = rout;