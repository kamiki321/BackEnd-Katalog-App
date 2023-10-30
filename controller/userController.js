const { User, Role } = require('../models')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');


const findAllUsers = async (req,res) => {
    try{
        const data = await User.findAll()

        res.json(data)
    } catch(error){
        console.log(error, '<<< error find all user')
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
        


        const { username, email, password  } = req.body

        const alreadyExistUser = await User.findOne({ where: { email }}).catch(
            (err) => {
                console.log("Error: ", err)
            }
        );

        if (alreadyExistUser){
            return res.status(400).json({
                status: 'error', 
                message: "Email already taken"
            })
        }

        const newUser = await User.create({
            username: username, 
            email: email, 
            password: password,
            roleId: 2
        })
        
        
        res.status(201).json({
            status : 'ok',
            data : {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                password: newUser.password,
                role: newUser.roleId,
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
        const { id } = req.params;
        const { username, email, password, roleId } = req.body; // Ganti "role" dengan "roleId"

        const user = await User.findByPk(id);
        const adminRole = await Role.findOne({ where: { name: 'admin' }});

        if (!user){
            return res.status(404).json({
                status:'failed',
                message: `data pengguna dengan id ${id} tidak ditemukan`
            });
        }

        if (!adminRole) {
            // Jika peran "admin" belum ada, tambahkan peran tersebut ke dalam tabel Roles
            // Ini bisa dilakukan melalui seeder atau secara manual
            return res.status(500).json({
                status: 'error',
                message: 'Role "admin" belum tersedia. Silakan tambahkan role ini ke dalam tabel Roles terlebih dahulu.'
            });
        }

        if (roleId === adminRole.id) {
            // Hanya izinkan pembaruan jika roleId sesuai dengan peran "admin"
            // Lakukan pembaruan seperti yang sudah Anda lakukan sebelumnya
        } else {
            // Kembalikan kesalahan jika roleId tidak sesuai dengan peran "admin"
            return res.status(403).json({
                status: 'error',
                message: 'Anda tidak memiliki izin untuk mengatur peran selain "admin".'
            });
        }

        // Update
        user.username = username;
        user.email = email;
        user.password = password;
        user.updatedAt = new Date();
        user.roleId = roleId; // Gunakan "roleId" untuk mengatur peran

        // Simpan data
        await user.save();

        // Response
        res.json({
            status: 'ok',
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                password: user.password,
                updatedAt: user.updatedAt,
                roleId: user.roleId // Ganti "role" dengan "roleId"
            }
        });
    } catch (error) {
        console.log(error, '<------ error update user');
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
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

        // Cari pengguna dalam tabel User
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password'
            });
        }

        // Verifikasi kata sandi
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password'
            });
        }

        
        // Ambil peran pengguna dari tabel Role
        const role = await Role.findByPk(user.roleId);
        
        // Check if the user has the "admin" role

        // Create a JWT token
        const accessToken = jwt.sign({ id: user.id, email: user.email, role: role.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        // Periksa apakah pengguna memiliki peran "admin"
        if (role.name == 'admin') {
            return res.status(403).json({
                status: 'error',
                message: 'Silahkan login lewat halaman login admin'
            });
        }
        
        res.status(200).json({
            status: 'ok',
            data: {
                id: user.id,
                email: user.email,
                role: role.name,
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


//Untuk Admin
const createNewAdmin = async (req, res) => {
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

        const { username, email, password } = req.body;

        // Pastikan peran "admin" sudah ada dalam tabel Roles
        const adminRole = await Role.findOne({ where: { name: 'admin' }});

        if (!adminRole) {
            // Jika peran "admin" belum ada, tambahkan peran tersebut ke dalam tabel Roles
            // Ini bisa dilakukan melalui seeder atau secara manual
            return res.status(500).json({
                status: 'error',
                message: 'Role "admin" belum tersedia. Silakan tambahkan role ini ke dalam tabel Roles terlebih dahulu.'
            });
        }

        // Cek apakah email sudah ada
        const alreadyExistUser = await User.findOne({ where: { email } });

        if (alreadyExistUser) {
            return res.status(400).json({
                status: 'error',
                message: 'Email sudah digunakan.'
            });
        }

        // Buat akun admin dengan peran "admin"
        const newAdmin = await User.create({
            username,
            email,
            password,
            roleId: adminRole.id // Atur peran menjadi "admin"
        });

        res.status(201).json({
            status: 'ok',
            data: {
                id: newAdmin.id,
                username: newAdmin.username,
                email: newAdmin.email,
                role: newAdmin.roleId, // Anda dapat mengirimkan peran dalam respons
                createdAt: newAdmin.createdAt,
                updatedAt: newAdmin.updatedAt
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};



const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cari pengguna dalam tabel User
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password'
            });
        }

        // Verifikasi kata sandi
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password'
            });
        }

        // Ambil peran pengguna dari tabel Role
        const role = await Role.findByPk(user.roleId);

        // Periksa apakah pengguna memiliki peran "admin"
        if (role.name !== 'admin') {
            return res.status(403).json({
                status: 'error',
                message: 'Anda tidak memiliki izin admin'
            });
        } 
        
        // Jika pengguna berhasil login sebagai admin, buat JWT token
        const accessToken = jwt.sign(
            { id: user.id, email: user.email, role: role.name },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            status: 'ok',
            data: {
                id: user.id,
                email: user.email,
                role: role.name,
                token: accessToken
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

module.exports = {findAllUsers, getUsersById, createNewUser, updateUser, deleteUser, loginUser, loginAdmin, logoutUser, createNewAdmin}