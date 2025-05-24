import { isValidUser } from './users.middleware.js'
import { isValidPokemon } from './pokedex.middleware.js'
import {
  isValidLogin,
  isValidAdmin,
  isAuth,
  isAdmin
} from './auth.middleware.js'

export {
  isValidPokemon,
  isValidUser,
  isValidLogin,
  isValidAdmin,
  isAuth,
  isAdmin
}
