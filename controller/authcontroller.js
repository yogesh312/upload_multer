const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// adding user in database
module.exports.signup = (req, res) => {
    const {username, name, mobile, password} = req.body;
    // fileld validation
    if (!username|| !name|| !password){
        return res.status(400).json({message: "Please enter all the fields"})
    }
    //check the username is already taken or not
    User.findOne({username: username}).then((user) => {
        if (user) return res.status(401).json({message: 'username is not available, choose another one'})
    })

    //create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) =>{
            if (err) throw err;
            //save the user
            const newUser = new User ({username: username, name:name, mobile:mobile, password: hash});
            newUser
                .save()
                .then((user) => {
                    console.log(user);
                    return res.status(200).json({message:"user saved successfully"})
                })
                .catch((error) => {
                    {
                        return res.status(500).json({message:error.message || "something went wrong while creating user"})
                     }
                });
        });
    });
};
//Login for registered user
module.exports.login = (req, res) => {
    const {username, password} = req.body;
    //fileld validation
    if(!username || !password){
        return res.status(400).json({
            messsage:"please enter all fields"
        });
    }
    //get the user from database
    User.findOne({username: username}).then((user) => {
        if(!user){
            return res.status(401).json({
                message:"User does not exist"
            });
        }
        //password Validation
        bcrypt.compare(password, user.password).then((isMatch) => {
            if(!isMatch){
                return res.status(401).json({message: "Username or password does not match"})
            }
        })
        //give auth token
        jwt.sign({id: user._id}, process.env.JWT_KEY, {expiresIn:3600}, (err, token) => {
            if(err) {
                throw err;
            }
            return res.status(200)
            .json({ token:token, id: user._id, username:user.username, name:  user.name}, )
        });

    });
};
