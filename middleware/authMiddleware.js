const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            status: 'error',
            message: 'No token provided'
        });
    }

    const token = authorizationHeader.split('Bearer ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: 'error',
                message: 'Failed to authenticate token'
            });
        }

        // Menggunakan sessionStorage untuk menyimpan token
        req.sessionStorage = {
            token: token
        };

        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    });
};

const AdminRole = (req, res, next) => {
    // try {
    //     if (req.role === 'admin') {
    //         next();
    // }
    // } catch (error) {
    //     return res.status(403).json({
    //         status: 'Forbidden',
    //         message: 'You are not an Admin'
    //     })
    // }
}

const UserRole = (req, res, next) => {
    // if (req.role === 'user') {
    //     next(); // User is a regular user, proceed to the next middleware or route
    // } else {
    //     return res.status(403).json({
    //         status: 'Forbidden',
    //         message: 'You are not a regular user'
    //     });
    // }
}




module.exports = { verifyToken, AdminRole, UserRole };
