const jwt = require('jsonwebtoken');
const Token = require('../models/Token');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ mensaje: "Acceso denegado" });

    jwt.verify(token, "clave_secreta", async (err, user) => {
        if (err) return res.status(403).json({ mensaje: "Token no valido " });

        const tokenExists = await Token.exists({ token: token });
        if (!tokenExists) return res.status(403).json({ mensaje: "Token no encontrado" })
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;