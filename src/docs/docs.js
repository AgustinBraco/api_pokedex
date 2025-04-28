import environment from '../environment/environment.js'
import { readFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const docsData = await readFile(join(__dirname, './docs.json'), 'utf-8')
const rootData = await readFile(join(__dirname, './routes/root.json'), 'utf-8')
const authData = await readFile(join(__dirname, './routes/auth.json'), 'utf-8')
const productsData = await readFile(join(__dirname, './routes/products.json'), 'utf-8')
const userData = await readFile(join(__dirname, './routes/users.json'), 'utf-8')

const docs = JSON.parse(docsData)
const root = JSON.parse(rootData)
const auth = JSON.parse(authData)
const products = JSON.parse(productsData)
const user = JSON.parse(userData)

docs.server = `${environment.ORIGIN_URL}/api/crud`

docs.paths = {
  ...root,
  ...auth,
  ...products,
  ...user
}

export default docs