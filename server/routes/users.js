const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');
const tokenSecret = require('../config/token-secret');

router.post('/register', (req, res, next) => {
    const saltRounds = 10;
    if (req.body.email && req.body.password) {
        bcrypt.hash(req.body.password, saltRounds)
            .then((hashedPassword) => {
                const user = new User({
                    email: req.body.email,
                    password: hashedPassword
                });
                user.save((error, savedUser) => {
                    if (error) {
                        res.status(502).json({
                            status: 'fail',
                            message: 'fail to save the user to the database',
                            error
                        });
                    } else {
                        res.status(200).json({
                            status: 'success',
                            user: savedUser
                        });
                    }
                })
            })
            .catch((error) => {
                res.status(502).json({
                    status: 'fail',
                    message: 'fail to hash the password',
                    error
                });
            });
    } else {
        return res.status(502).json({
            status: 'fail',
            message: 'user is existing in the database'
        });
    }
});

router.post('/login', (req, res, next) => {
    if (req.body.email && req.body.password) {
        const user = {
            email: req.body.email,
            password: req.body.password
        };
        User.findOne({email: user.email})
            .then(foundUser => {
                bcrypt.compare(user.password, foundUser.password)
                    .then(isChecked => {
                        if (isChecked) {
                            console.log(tokenSecret.secret());
                            jsonwebtoken.sign(user, tokenSecret.secret(), (error, token) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    res.status(200).json({
                                        status: 'success',
                                        token: token,
                                        userId: foundUser._id
                                    });
                                }
                            });
                        }
                        console.log(isChecked);
                    })
                    .catch();
                console.log(foundUser);
            })
            .catch(error => {
                console.log(error);
            });
        // bcrypt.compare()
    }
});

module.exports = router;
