import { encryptPassword, isEncrypted } from '../utils/encrypt.js'

class UserDTO {
  constructor(user) {
    this.first_name = user.first_name
    this.last_name = user.last_name
    this.birthday = user.birthday
    this.gender = user.gender
    this.email = user.email
    this.password = user.password
    this.role = 'user'
  }

  static async create(user) {
    const encryptedPassword = await encryptPassword(user.password)
    return new UserDTO({ ...user, password: encryptedPassword })
  }

  static async update(user) {
    const encryptedPassword = isEncrypted(user.password)
      ? user.password
      : await encryptPassword(user.password)

    return new UserDTO({ ...user, password: encryptedPassword })
  }
}

export default UserDTO
