import JWT from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY

export const authRequired = (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(401).send({message: 'Invalid no token provided'})
  }

  JWT.verify(token, SECRET_KEY, (err, data) => {
    if (err) return res.status(403).send({ message: err.message })
    req.user = data
  })

  next();
}