const { User } = require('../models')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const findAllUsers = async (req,res) => {
    try{
        const data = await User.findAll()

        const result = {
            status: 'ok',
            data: data
        }
        res.json(result)
    } catch(error){
        console.log(error, '<<< error find all books')
    }

}

const getUsersById = async(req, res) => {
    try{
        const { id } = req.params

        const data = await User.findByPk(id)
        console.log(data, '<----- data')

        if (data === null){
            return res.status(404).json({
                status:'failed',
                message:`Data pengguna dengan id ${id} tidak ditemukan,`
            })
        }
        res.json({
            status: 'ok',
            data: data
        })
    } catch(error) {
        console.log(error, "<< error get user by id");
    }
}

const createNewUser = async(req, res) => {
    try {
        
        await Promise.all([
            check('email')
              .isEmail()
              .withMessage('Invalid email format')
              .run(req),
            check('password')
                .isLength({ min: 8 }) // Enforce a minimum length of 8 characters
                .notEmpty()
                .run(req),
          ]);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const emailErrors = errors.array().filter((error) => error.param === 'email');
            const passwordErrors = errors.array().filter((error) => error.param === 'password');
      
            return res.status(400).json({
              status: 'error',
              errors: {
                email: emailErrors.length > 0 ? emailErrors[0].msg : 'email cannot be empty or the same with existed email',
                password: passwordErrors.length > 0 ? passwordErrors[0].msg : 'password cannot be empty or less than 8 char',
              },
            });
          }
        


        const { username, email, password } = req.body

        const alreadyExistUser = await User.findOne({ where: { email }}).catch(
            (err) => {
                console.log("Error: ", err)
            }
        );

        if (alreadyExistUser){
            return res.json({ 
                message: "Email already taken"
            })
        }

        const newUser = await User.create({
            username: username, 
            email: email, 
            password: password
        })
        
        
        res.status(201).json({
            status : 'ok',
            data : {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                password: newUser.password,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            }
        })
    } catch (error) {
            console.log(error, '<---- error create new user')
        
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { username, email, password } = req.body

        const user = await User.findByPk(id)

        if (!user){
            return res.status(404).json({
                status:'failed',
                message: `data pengguna dengan id ${id} tidak ditemukan`
            })

        }

        //update
        user.username = username
        user.email = email
        user.password = password
        user.updatedAt = new Date()

        //save data
        user.save()

        //return
        res.json({
            status: 'ok',
            data: {
                id: user.id,
                username : user.username,
                email : user.email,
                password : user.password,
                createdAt : user.createdAt,
                updateAt: user.updateAt
            }
        })
    } catch (error) {
        console.log(error, '<------ error update user')
    }
}


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findByPk(id)

        if (!user){
            return res.status(404).json({
                status:'failed',
                message: `data pengguna dengan id ${id} tidak ditemukan`
            })

        }
        
        user.destroy()

        res.json({
            status : 'ok',
            message : `berhasil delete user dengan id ${id}`
        })

    } catch (error) {
        console.log(error, '<------ error delete user')
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password'
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password'
            });
        }

        // Create a JWT token
        const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });

        
        res.status(200).json({
            status: 'ok',
            data: {
                id: user.id,
                email: user.email,
                token: accessToken
            }
        });
    } catch (error) {
        console.log(error, '<---- error login user');
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

const logoutUser = async (req, res, next) => {
    // You can perform any additional actions needed for logout on the server-side here.
    // For simplicity, this example only responds with a success message.
    
    // Respond with a success message
    res.status(200).json({
      status: 'ok',
      message: 'Successfully logged out'
    });
  };


module.exports = {findAllUsers, getUsersById, createNewUser, updateUser, deleteUser, loginUser, logoutUser}