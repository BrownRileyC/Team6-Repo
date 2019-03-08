module.exports = {
    development: {
      username: "root",
      password: process.env.localhost_PW,
      database: "youGotThis_db",
      host: "localhost",
      dialect: "mysql"
    },
    test: {
      username: "root",
      password: null,
      database: "youGotThis_db",
      host: "localhost",
      dialect: "mysql",
      logging: false
    },
    production: {
      use_env_variable: JAWSDB_URL,
      dialect: "mysql"
    }
  }
  