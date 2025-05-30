import environment from '../environment/environment.js'
import { readFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

let docs, auth, user, pokedex

docs = await readFile(join(__dirname, './docs.json'), 'utf-8')
auth = await readFile(join(__dirname, './routes/auth.json'), 'utf-8')
user = await readFile(join(__dirname, './routes/users.json'), 'utf-8')
pokedex = await readFile(join(__dirname, './routes/pokedex.json'), 'utf-8')

docs = JSON.parse(docs)
auth = JSON.parse(auth)
user = JSON.parse(user)
pokedex = JSON.parse(pokedex)

docs.server = `${environment.ENVIRONMENT_URL}/api/pokedex`

docs.paths = {
  ...pokedex,
  ...auth,
  ...user
}

export default docs
