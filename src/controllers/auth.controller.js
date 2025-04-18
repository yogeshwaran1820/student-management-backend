const bcrypt = require('bcrypt');
const Users = require('../schemas/auth.model');
const jwt = require('jsonwebtoken');

const signup = async(req, res) => {
    try {
        const { rollNo, username, password, role } = req.body;
        const requiredFields = ['username', 'password', 'role'];
        if(role === 'student') {
            requiredFields.push('rollNo')
        }
        const missingFields = requiredFields.filter((res) => !req.body[res])
        if(missingFields.length != 0){
            return res.status(400).json({code: 400, message: 'Please provide the missing fields', missingFields: missingFields})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.findOne({username});
        console.log(user)
        if(user) return res.status(400).json({code: 400, message : 'Username already exists'});
        await Users.create({
            rollNo: rollNo,
            username: username,
            password: hashedPassword,
            role: role
        })
        res.status(200).json({code:200, message: 'User created successfully'})
    } catch(err) {
        console.log(err)
        return res.status(500).json({code:500, message: 'Internal Server Error', err})
    }
   
}


const login = async(req, res) => {
    try {
        const {username, password}  = req.body;
        const requiredFields = ['username', 'password'];
        const missingFields = requiredFields.filter((field) => !req.body[field]);
        if(missingFields.length != 0) return res.status(400).json({code: 400, message: 'Please provide missing fields', missingFields: missingFields});
        const user = await Users.findOne({username});
        if(!user) return res.status(400).json({code: 400, message: "User doesn't exists"});
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch) return res.status(400).json({code:400, message: 'Password is incorrect'});
        const token = await jwt.sign({id: user._id, username: user.username, role: user.role},process.env.SECRET_KEY,{algorithm:'HS256', expiresIn: '30m'}) 
        res.status(200).json({code: 200, message: 'successfully logged in', jwtToken: token, details: [{rollNo: user.rollNo, role: user.role}]})
    } catch(err) {
        res.status(500).json({code: 500, message: 'Internal Server Error'})
    }

}

module.exports = {
    login,
    signup
}