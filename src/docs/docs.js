import environment from '../environment/environment.js'
import docs from './docs.json' assert { type: 'json' }
import root from './routes/root.json' assert { type: 'json' }
import auth from './routes/auth.json' assert { type: 'json' }
import prodcuts from './routes/products.json' assert { type: 'json' }
import user from './routes/users.json' assert { type: 'json' }

docs.server = `${environment.ORIGIN_URL}/api/crud`

console.log(docs.server)

docs.paths = {
  ...root,
  ...auth,
  ...prodcuts,
  ...user
}

export default docs
