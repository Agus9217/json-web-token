import Role from "../models/Roles.js"

const createRoles = async () => {

  try {
    const count = await Role.estimatedDocumentCount()
    if (count > 0) {
      return
    }
  
    const values = await Promise.all([
      new Role({ name: 'admin'}).save(),
      new Role({ name: 'moderator'}).save(),
      new Role({ name: 'user'}).save()
    ])
  
    console.log(values)
  } catch (error) {
    console.log({ error: error })
  }
}

export default createRoles