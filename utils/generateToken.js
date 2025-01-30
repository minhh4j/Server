const jwt = require('jsonwebtoken')

// Genarate accessTokan

const genarateAccessToken = (user) => {
    return jwt.sign(
        {
            id:user.id,
            email:user.email,
            role:user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '5m' }
    )
}

// Generate refreshToken

const genaraterefreshToken = (user) => {
    return jwt.sign(
        {
            id:user.id,
            email:user.email,
            role:user.role
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )
}

module.exports = {genarateAccessToken , genaraterefreshToken }