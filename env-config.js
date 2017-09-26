const prod = process.env.NODE_ENV === 'production'

module.exports = {
  'process.env.BACKEND_URL': prod ? 'https://tvdapp.herokuapp.com/api/shows' : 'http://localhost:3020/api/shows'
}

