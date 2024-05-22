const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Token = require('../models/Token');

const register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ mensage: "Usuario registrado con exito" })
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username: user.username }, "clave_secreta", { expiresIn: '1h' });
        const newToken = new Token({ token: token });
        await newToken.save();
        res.json({ token: token })
    } else {
        res.status(401).json({ mensaje: "Credenciales incorrectas" })
    }
};

const verify = async (req, res) => {
    const token = req.body.token;
    jwt.verify(token, "clave_secreta", async (err, decoded) => {
        if (err) {
            res.status(401).json({ mensaje: "Token invalido" });
        } else {
            const tokenExistd = await Token.exists({ token: token });
            if (tokenExistd) {
                res.json({ mensaje: "Token valido" })
            } else {
                res.status(401).json({ mensage: "Token no encontrado en la base de datos" })
            }
        }
    });
};

const logout = async ( req, res)=>{
    const token = req.body.token;
    await Token.deleteOne({token: token});
    res.json({mensaje: "Token revocado"})
}

module.exports = {register, login, verify, logout};