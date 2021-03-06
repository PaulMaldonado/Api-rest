// Importando el módelo user
const User = require('../models/User');
// Importando joi para validar campos
const Joi = require('@hapi/joi');
// Importando bcrypt
const bcrypt = require('bcrypt');
// Importando jsonwebtoken
const jwt = require('jsonwebtoken');

// Validar campos de registro
const validateRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(1255).required().email(),
    password: Joi.string().min(6).max(1024).required()
});

// validar campos de login
const validateLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
});

// Método que permitira al usuario ingresar una vez que este logeado correctamente
exports.home = (req, res) => {
    res.status(200).json({
        error: null,
        data: {
            title: 'Mi ruta protegida al logearme correctamente',
            user: req.user
        }
    })
};

// Método para registrar usuarios
exports.register = async (req, res) => {
    // Validar usuario
    const { error } = validateRegister.validate(req.body);

    if(error) {
        return res.status(400).json({
            error: 'Verifique su registro'
        })
    }


    // Preguntar si ya existe ese correo electronico
    const emailExist = await User.findOne({
        email: req.body.email
    });

    if(emailExist) {
        return res.status(400).json({
            error: 'Email ya registrado, intente con otro Email'
        })
    }

    // encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    // Creando un nuevo usuario
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    });

    try {
        const savedUser = await user.save();

        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }

};


// Método para iniciar sesión
exports.login = async (req, res) => {
    const { error } = validateLogin.validate(req.body);

    if(error) {
        return res.status(400).json({
            error: error
        })
    }

    // Validar correo electronico
    const user = await User.findOne({
        email: req.body.email
    });

    if(!user) {
        return res.status(400).json({
            error: 'Usuario no encontrado con este email'
        })
    }

    // Validar la contraseña
    const passwordValidate = await bcrypt.compare(req.body.password, user.password);

    if(!passwordValidate) {
        return res.status(400).json({
            error: 'Contraseña no valida!!'
        })
    }

    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET)


    res.header('auth-token', token).json({
        error: null,
        data: {
            token: token
        }
    });

};