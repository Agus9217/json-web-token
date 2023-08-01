import Role from "../models/Roles.js"
import User from "../models/Users.js"
import JWT from "jsonwebtoken"

const SECRET_KEY = process.env.SECRET_KEY

export const getAllUsers = async (req, res) => {
  const getAll = await User.find()
  res.send({ data: getAll })
}

export const createUser = async (req, res) => {

  const { username, email, password, roles } = req.body

  const user = new User({
    username,
    email, 
    password: await User.encryptPassword(password)
  })

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } })
    user.roles = foundRoles.map(role => role._id)
  }

  const role = await Role.findOne({ name: 'user' })
  user.roles = [role._id]

  const userCreated = await user.save()
  JWT.sign({ 
    id: userCreated._id }, 
    SECRET_KEY, 
    { 
      expiresIn: '1d' 
    }, (err, token) => {
      if (err) {
        console.log(err)
      }
      res.cookie('token', token)
      res.send({ message: 'Created Succesfuly', data: token })
    })
  console.log(userCreated)
}

export const login = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email }).populate('roles')
  if (!userFound) {
    return res.status(400).json({message: "User Not found"})
  }

  const matchPassword = await User.comparePassword(req.body.password, userFound.password)

  if (!matchPassword) {
    return res.status(401).send({token: "Null", message: "Invalid password"})
  }

  const token = JWT.sign({ 
    id: userFound._id 
  }, SECRET_KEY, { 
    expiresIn: '1d'
  }, (err, token) => {
    res.cookie('token', token)
    res.send({token, data: 'Connect successful'})
    console.log(userFound)
  })
}

export const logout = (req, res) => {
  res.cookie('token', '', { expires: new Date(0)})
  res.status(200).send({ data: 'Logout successful' })
}