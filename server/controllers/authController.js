require('dotenv').config({ path: './server/.env' })
const { User } = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.sign_up = async (req, res) => {
    try {
        const { password, userName, firstName, lastName, email } = req.body
        console.log(password, userName, firstName, lastName, email)
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({ password: hashedPassword, userName: userName, firstName: firstName, lastName: lastName, email: email })
        res.status(201).json({ successMessage: "vous êtes inscrit avec succès" })

    } catch (error) {

        if (error.name === "SequelizeValidationError")
            res.status(400).json({ error })
        else if (error.name === "SequelizeUniqueConstraintError") {
            let message = "veuiller choisire un autre"
            if (error.errors[0].path == "user.userName")
                message += " username"
            else
                message += " email"
            res.status(400).json({ errorMessage: { errors: { message: message } } })
        }
        else
            res.status(500).json({ errorMessage: { errors: { message: "une erreur s\'et produite , contacter l\'dmin" } } })
    }

}

exports.login = async (req, res) => {

    try {
        const { userName, password } = req.body
        const user = await User.findOne({ where: { userName: userName } })
        if (user == null) {
            return res.status(400).send('Cannot find user')
        }

        if (await bcrypt.compare(password, user.password)) {
            const accessToken = generateAccessToken(user)

            const refreshToken = jwt.sign(user.dataValues, process.env.REFRESH_TOKEN_SECRET)
            res.json({ accessToken: accessToken, refreshToken: refreshToken })
        } else {
            res.status(404).json({ errorMessage: { errors: { message: "utilisateur introuvable" } } })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}

exports.logout = async (req, res) => {
    // refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    console.log(req.user)
    res.status(204).json({ msg: 'hi' })
}
//--------------------MidelWares-------------------
exports.passwordValidationMidelware = async (req, res, next) => {
    const { password } = req.body
    if (password === null || password.trim() == "")
        return res.status(400).json({ errorMessage: { errors: { message: "mot de pass obligatoire" } } })
    next()
}

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        // console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}
//-------------------Functions-----------------------
function generateAccessToken(user) {
    // console.log(user.dataValues)
    console.log(user.dataValues)
    // const claims = { sub: user.id, name: user.userName + ' ' + user.email, admin: false, exp: '30d' }
    return jwt.sign(user.dataValues, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30d' })
}