import database from '../../src/database/database.js'

export const setup = () => {
  beforeEach(done => {
    const tables = ['pokedex', 'users']
    let cleared = 0

    tables.forEach(table => {
      // Delete rows
      database.run(`DELETE FROM ${table}`, err => {
        if (err) return done(err)

        // Reset autoincrement
        database.run(
          `DELETE FROM sqlite_sequence WHERE name='${table}'`,
          err2 => {
            if (err2) return done(err2)
            cleared++
            if (cleared === tables.length) done()
          }
        )
      })
    })
  })

  after(done => {
    const tables = ['pokedex', 'users']
    let cleared = 0

    tables.forEach(table => {
      // Delete rows
      database.run(`DELETE FROM ${table}`, err => {
        if (err) return done(err)

        // Reset autoincrement
        database.run(
          `DELETE FROM sqlite_sequence WHERE name='${table}'`,
          err2 => {
            if (err2) return done(err2)
            cleared++
            if (cleared === tables.length) done()
          }
        )
      })
    })
  })
}
