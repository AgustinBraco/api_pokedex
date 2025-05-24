import { readFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import environment from '../../src/environment/environment.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Auth
const authData = await readFile(join(__dirname, '../data/auth.json'), 'utf-8')
export const auth = JSON.parse(authData)

auth.admin.key = environment.ADMIN_KEY
auth.admin.valid = {
  email: environment.ADMIN_EMAIL,
  password: environment.ADMIN_PASSWORD,
  role: environment.ADMIN_ROLE
}

// Users
const usersData = await readFile(join(__dirname, '../data/users.json'), 'utf-8')
export const users = JSON.parse(usersData)

// Users
const pokedexData = await readFile(join(__dirname, '../data/pokedex.json'), 'utf-8')
export const pokedex = JSON.parse(pokedexData)