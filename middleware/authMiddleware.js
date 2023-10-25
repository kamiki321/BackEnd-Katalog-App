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
        next();
    });
};

module.exports = verifyToken;
