import { encryptPassword } from '../utils/encrypt.js'

class UserDTO {
  constructor(user) {
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.birthday = user.birthday || ''
    this.gender = user.gender || ''
    this.email = user.email
    this.password = user.password
    this.role = 'user'
  }

  static async create(user) {
    const hashedPassword = await encryptPassword(user.password)
    return new UserDTO({ ...user, password: hashedPassword })
  }
}

export default UserDTO
