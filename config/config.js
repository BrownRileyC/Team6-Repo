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
      username: process.env.JAWS_username,
      password: process.env.JAWS_pw,
      database: process.env.JAWS_database,
      host: process.env.JAWS_host,
      dialect: "mysql"
    }
  }
  